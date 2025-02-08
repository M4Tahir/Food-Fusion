import mongoose from "mongoose";
import validator from "validator";

const schemeOption = {
    timestamps: {createdAt: "date_created", updatedAt: "date_updated"},
    toJSON: {virtuals: true,},
    toObject: {virtuals: true},
    versionKey: "version"
};

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [1, "First name can't be less than 1 character"],
        maxLength: [30, "First name can't exceed 30 characters"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
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
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    // As this fields is temporary mean that we will delete set this field to be undefended after the password is matched.
    passwordConfirm: {
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


const UserModel = mongoose.model("User", schema);
export default UserModel;
