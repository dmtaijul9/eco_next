import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { isAdmin, isAuthenticatedUser } from "@/middlewares/auth";
import { getLetestOrders } from "@/controllers/adminController";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).use(isAdmin).get(getLetestOrders);

export default handler;
