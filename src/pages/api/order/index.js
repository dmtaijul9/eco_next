import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { createNewOrder } from "@/controllers/orderControllers";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).post(createNewOrder);

export default handler;
