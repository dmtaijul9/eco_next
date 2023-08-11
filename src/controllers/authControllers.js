import ErrorHandler from "@/utils/errorHandler";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import User from "@/models/user";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";
import absoluteUrl from "next-absolute-url";
import bcrypt from "bcryptjs";

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { first_name, last_name, email, phone, password } = req.body;

  const salt = await bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  let existUser = await User.findOne({ email });

  if (existUser) {
    return next(new ErrorHandler("Email already exists.", 400));
  }
  existUser = await User.findOne({ phone });

  if (existUser) {
    return next(new ErrorHandler("Phone number already exists.", 400));
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    message: "Account Registered Successfully",
  });
});

export { registerUser };
