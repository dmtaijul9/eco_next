import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { createNewOrder, getMyOrders } from "@/controllers/orderControllers";
import { isAuthenticatedUser } from "@/middlewares/auth";

const handler = nc({ onError });
db();

handler.use(isAuthenticatedUser).post(createNewOrder);
handler.use(isAuthenticatedUser).get(getMyOrders);

export default handler;
