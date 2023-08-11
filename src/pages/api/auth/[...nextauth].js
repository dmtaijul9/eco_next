import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import User from "@/models/user";
import db from "@/config/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  url: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        db();

        const { phone, password } = credentials;

        if (!phone || !password) {
          throw new Error("Please enter all fields");
        }

        const user = await User.findOne({ phone }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
