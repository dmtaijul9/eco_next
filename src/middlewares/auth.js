import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import User from "@/models/user";

export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  if (user.role !== "ADMIN") {
    return next(new ErrorHandler("Only admin can access this resource.", 403));
  }

  next();
});

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let session;
  if (req.method === "GET") {
    session = await getSession({ req });
  }

  if (!session) {
    const token = await getToken({
      req,
      secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    });

    if (token) {
      session = { user: token };
    } else {
      return next(
        new ErrorHandler("Login first to access this resource.", 401)
      );
    }
  }

  req.user = session.user;
  next();
});
