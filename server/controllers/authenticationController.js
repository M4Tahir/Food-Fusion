import { handleAsyncError } from "../utils/handleAsyncError.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ExpressErrorHandler from "../utils/expressErrorHandler.js";
import { promisify } from "util";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";
import config from "../config/config.js";

const signToken = (id) => {
	return jwt.sign({ id }, config.jwt.secrete, { expiresIn: config.jwt.expires });
};

const createAndSendToken = (user, res, statusCode, next, sendUserData = false) => {
	const token = signToken(user._id);

	const cookiesOption = {
		expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: "Strict",
	};

	if (process.env.NODE_ENV === "production") cookiesOption.secure = true;
	res.cookie("accessToken", token, cookiesOption);

	const response = {
		status: "success",
		token: token,
	};

	// signup.
	if (sendUserData) response.data = { user };

	res.status(statusCode).json(response);
};

const refreshToken = async (req, res, next) => {
	createAndSendToken(req.user, res, 200, next, false);
};

const signup = handleAsyncError(async (req, res, next) => {
	const user = await UserModel.create({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		password_confirm: req.body.password_confirm,
		avatar: req.body.avatar,
	});

	user.password = undefined;
	createAndSendToken(user, res, 401, true);
});

const login = handleAsyncError(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new ExpressErrorHandler("email and password are required.", 404));
	}
	// TODO: Implement access Token and refresh token mechanism.

	const user = await UserModel.findOne({ email: email }).select("+password");

	if (!user || !(await user.isPasswordCorrect(password, user.password))) return next(new ExpressErrorHandler("incorrect email or password"));

	createAndSendToken(user, res, 201, next, false);
});

const forgotPassword = handleAsyncError(async (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		return next(new ExpressErrorHandler("Please provide a valid email.", 400));
	}

	const user = await UserModel.findOne({ email });
	if (!user) {
		return next(new ExpressErrorHandler("If this email is registered, you will receive a password reset link.", 200));
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;

	const message = `Forgot your password? Submit a PATCH request with your new password and password_confirm to: ${resetUrl}.\nIf you didn't request this, please ignore this email.`;

	try {
		await sendEmail({ email, subject: "Your password reset link (valid for 10 min)", message });

		return res.status(200).json({
			status: "success",
			message: "Password reset link has been sent to your email.",
		});
	} catch (error) {
		user.password_reset_token = undefined;
		user.password_reset_expires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(new ExpressErrorHandler("There was an error sending the email, please try again later.", 500));
	}
});

const resetPassword = handleAsyncError(async (req, res, next) => {
	const token = req.params?.resetToken;
	if (!token) return next(new ExpressErrorHandler("Invalid or expired reset link", 400));

	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await UserModel.findOne({
		password_reset_token: hashedToken,
		password_reset_expires: { $gt: Date.now() },
	});

	if (!user) return next(new ExpressErrorHandler("Reset link is invalid or has expired", 400));

	const { password, password_confirm } = req.body;

	user.password = password;
	user.password_confirm = password_confirm;
	user.password_reset_token = undefined;
	user.password_reset_expires = undefined;
	await user.save();

	// Send new token after successful reset
	createAndSendToken(user, res, 200, next, false);
});

const updateMyPassword = handleAsyncError(async (req, res, next) => {
	const user = await UserModel.findById(req.user.id).select("+password");
	console.log(user.password);
	if (!(await user.isPasswordCorrect(req.body.password_current, user.password)))
		return next(new ExpressErrorHandler("current password is incorrect"));

	const password = req.body.password?.trim();
	const passwordConfirm = req.body.password_confirm?.trim();
	if (!(password && passwordConfirm)) return next(new ExpressErrorHandler("please provide password correct password"));
	user.password = password;
	user.password_confirm = passwordConfirm;
	await user.save();
	createAndSendToken(user, res, 200, next, false);
});

/**
 * Extracts and validates the Bearer token from the request headers.
 * Returns the token string if valid, otherwise returns `null`.
 */
const extractToken = (req, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith("Bearer ")) {
		const token = authHeader.split(" ")[1]?.trim();
		// as when header doesn't have an access token, then we have authorization=Bearer null, and at index[1] we get the string "null" which is truthy value.
		if (token && token !== "null") return token;
		return next(new ExpressErrorHandler("access token is not found", 404));
	}

	// check if a token exists in cookies after parsing.
	return req.cookies?.accessToken || null;
};

const protect = handleAsyncError(async (req, res, next) => {
	const accessToken = extractToken(req, next);

	if (!accessToken) return next(new ExpressErrorHandler("access denied. Access token not found, please log in to access this resource", 401));

	// jwt.verify(accessToken, process.env.JWT_SECRETE, (err) => {
	//     console.error(err);
	// });
	const decoded = await promisify(jwt.verify)(accessToken, config.jwt.secrete);
	console.log(decoded);
	const currentUser = await UserModel.findById(decoded.id);

	if (!currentUser) return next(new ExpressErrorHandler("user account no longer exists. Please sign up again", 401));

	if (currentUser.passwordChangedAfter(decoded.iat))
		return next(new ExpressErrorHandler("your password was recently changed. Please log in again", 403));

	req.user = currentUser;

	// grant access to the protected router.
	next();
});

const restrictTo = (...roles) => {
	return (req, res, next) => {
		// Default role for each user "user".
		if (!roles.includes(req.user.role)) return next(new ExpressErrorHandler("access denied. your are not allowed to access this resource"));

		// grant access.
		next();
	};
};

export { signup, login, refreshToken, forgotPassword, resetPassword, updateMyPassword, protect, restrictTo };
