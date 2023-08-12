import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { isAdmin, isAuthenticatedUser } from "@/middlewares/auth";
import { getDashboardAnalytics } from "@/controllers/adminController";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).use(isAdmin).get(getDashboardAnalytics);

export default handler;
