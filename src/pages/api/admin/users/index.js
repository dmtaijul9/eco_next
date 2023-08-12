import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { isAdmin, isAuthenticatedUser } from "@/middlewares/auth";
import { getLetestUsers } from "@/controllers/adminController";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).use(isAdmin).get(getLetestUsers);

export default handler;
