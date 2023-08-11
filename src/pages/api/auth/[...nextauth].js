import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import User from "@/models/user";
import db from "@/config/db";
import { removeLeadingDigits } from "@/tools/removeLeadingDigits";

export default NextAuth({
  url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        db();

        const { phone, password } = credentials;

        if (!phone || !password) {
          throw new Error("Please enter all fields");
        }

        const bdPhone = removeLeadingDigits(phone);

        if (bdPhone.length !== 13) {
          throw new Error("Invalid phone number.");
        }

        const user = await User.findOne({ phone: bdPhone }).select("+password");

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const { _id, first_name, last_name, email, phone } = user;
        token.user = { _id, first_name, last_name, email, phone };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
});
