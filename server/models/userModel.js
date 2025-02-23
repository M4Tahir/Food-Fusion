import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schemeOption = {
    timestamps: {createdAt: "date_created", updatedAt: "date_updated"},
    toJSON: {virtuals: true,},
    toObject: {virtuals: true},
    versionKey: "version"
};

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        minLength: [1, "First name can't be less than 1 character"],
        maxLength: [30, "First name can't exceed 30 characters"],
        trim: true
    },
    last_name: {
        type: String,
        minLength: [1, "Last name can't be less than 1 character"],
        maxLength: [30, "Last name can't exceed 30 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
        validate: {
            validator: function (value) {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
    },
    // As this fields is temporary mean that we will delete set this field to be undefended after the password is matched.
    password_confirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords do not match"
        }
    },
    avatar: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    password_changed_at: {
        type: Date,

    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }

}, schemeOption);

// To encrypt the password before saving to a database.
schema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.password_confirm = undefined;
    next();
});

schema.pre("save", async function (next) {
    // if the password is not modified and its new document, then no need to add pass changed field.
    if (!this.isModified("password") || this.isNew)
        return next();
    this.password_changed_at = Date.now() - 2000; // -2000ms for delay.
    next();
});

/**
 * Compares a plaintext password with a hashed password to check if they match.
 *
 * @async
 * @function isPasswordCorrect
 * @param {string} password - The plaintext password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the passwords match, otherwise `false`.
 */
schema.methods.isPasswordCorrect = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

/**
 * Checks if the password was changed after the JWT was issued.
 *
 * @function passwordChangedAt
 * @param {number} JWTTimestamp - The timestamp when the JWT was issued (in seconds).
 * @returns {boolean} Returns `true` if the password was changed after the JWT was issued, otherwise `false`.
 */
schema.methods.passwordChangedAfter = function (JWTTimestamp) {
    if (this.password_changed_at) {
        // check if the password is changed after issuing JWT.
        const changeTimeStamp = parseInt(this.password_changed_at.getTime() / 1000, 10);
        console.log(JWTTimestamp, changeTimeStamp);
        return JWTTimestamp < changeTimeStamp;
    }
    return false;
};

const UserModel = mongoose.model("User", schema);
export default UserModel;
