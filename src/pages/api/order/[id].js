import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { getSingleOrder } from "@/controllers/orderControllers";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).get(getSingleOrder);

export default handler;
