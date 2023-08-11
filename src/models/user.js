import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    maxLength: [20, "Your phone number cannot exceed 20 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password cannot be less than 6 characters"],
    select: false,
  },

  role: {
    type: String,
    required: "Please select a role",
    enum: {
      values: ["USER", "ADMIN"],
      message: "Please select correct role for account",
    },
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
