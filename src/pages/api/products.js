import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { getAllProducts } from "@/controllers/productControllers";

const handler = nc({ onError });
db();

handler.get(getAllProducts);

export default handler;
