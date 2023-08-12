import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";

import { isAdmin, isAuthenticatedUser } from "@/middlewares/auth";
import { updateUserMutation } from "@/controllers/authControllers";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).use(isAdmin).put(updateUserMutation);

export default handler;
