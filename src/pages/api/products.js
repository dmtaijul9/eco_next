import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import {
  createProduct,
  getAllProducts,
} from "@/controllers/productControllers";
import { isAdmin, isAuthenticatedUser } from "@/middlewares/auth";

const handler = nc({ onError });
db();

handler.get(getAllProducts);
handler.use(isAuthenticatedUser).use(isAdmin).post(createProduct);

export default handler;
