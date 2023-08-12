import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

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
