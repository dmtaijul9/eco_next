import ErrorHandler from "@/utils/errorHandler";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { removeLeadingDigits } from "@/tools/removeLeadingDigits";

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { first_name, last_name, email, phone, password } = req.body;

  const bdPhone = removeLeadingDigits(phone);

  if (bdPhone.length !== 13) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  const salt = await bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  let existUser = await User.findOne({ email });

  if (existUser) {
    return next(new ErrorHandler("Email already exists.", 400));
  }
  existUser = await User.findOne({ phone: bdPhone });

  if (existUser) {
    return next(new ErrorHandler("Phone number already exists.", 400));
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    phone: bdPhone,
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    message: "Account Registered Successfully",
  });
});

const updateUserMutation = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.query;

  const user = await User.findById(userId);
  const isRootAdmin =
    user.role === "ADMIN" &&
    user.email === "admin@admin.com" &&
    user.phone === "8801326108111";

  if (isRootAdmin)
    return next(new ErrorHandler("Root admin can't be updated.", 400));

  const { first_name, last_name, email, phone, password, role } = req.body;

  const variables = {};
  if (role) variables.role = role;
  if (first_name) variables.first_name = first_name;
  if (last_name) variables.last_name = last_name;
  if (email) variables.email = email;
  if (phone) variables.phone = phone;

  const updatedUser = await User.findByIdAndUpdate(userId, variables);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: {
      updatedUser,
    },
  });
});

export { registerUser, updateUserMutation };
