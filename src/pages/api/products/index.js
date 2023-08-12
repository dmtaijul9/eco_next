import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { getAllEcoSpecialProducts } from "@/controllers/productControllers";

const handler = nc({ onError });
db();

handler.get(getAllEcoSpecialProducts);

export default handler;
