import {handleAsyncError} from "../utils/handleAsyncError.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ExpressErrorHandler from "../utils/expressErrorHandler.js";
import {promisify} from "util";

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETE, {expiresIn: process.env.JWT_EXPIRES_IN});
};

const createAndSendToken = (user, res, statusCode, next, sendUserData = false) => {
    const token = signToken(user._id);

    const cookiesOption = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production")
        cookiesOption.secure = true;
    res.cookie("jwt", token, cookiesOption);

    const response = {
        status: "success",
        token: token,
    };

    // signup.
    if (sendUserData)
        response.data = {user};

    res.status(statusCode).json(response);
};

const signup = handleAsyncError(async (req, res, next) => {
    const user = await UserModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        password_confirm: req.body.password_confirm,
        avatar: req.body.avatar
    });

    user.password = undefined;
    createAndSendToken(user, res, 401, true);

});

const login = handleAsyncError(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new ExpressErrorHandler("Email and password are required.", 404));
    }
    // TODO: Implement access Token and refresh token mechanism.

    const user = await UserModel.findOne({email: email}).select("+password");

    if (!user || !await user.isPasswordCorrect(password, user.password))
        return next(new ExpressErrorHandler("incorrect email or password"));

    createAndSendToken(user, res, 201, next, false);
});


/**
 * Extracts and validates the Bearer token from the request headers.
 * Returns the token string if valid, otherwise returns `null`.
 */
const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1]?.trim();
    // as when header doesn't have an access token, then we have authorization=Bearer null, and at index[1] we get the string "null" which is truthy value.
    return token && token !== "null" ? token : null;
};

const protect = handleAsyncError(async (req, res, next) => {

    const accessToken = extractToken(req);
    if (!accessToken)
        return next(new ExpressErrorHandler("Access denied. Please log in to access this resource.", 401));

    // jwt.verify(accessToken, process.env.JWT_SECRETE, (err) => {
    //     console.error(err);
    // });
    const decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRETE);
    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser)
        return next(new ExpressErrorHandler("User account no longer exists. Please sign up again.", 401));

    if (currentUser.passwordChangedAfter(decoded.iat))
        return next(new ExpressErrorHandler("Your password was recently changed. Please log in again.", 403));

    req.user = currentUser;

    // grant access to the protected router.
    next();

});

export {signup, login, protect};