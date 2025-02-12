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


const UserModel = mongoose.model("User", schema);
export default UserModel;
