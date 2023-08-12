import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { getSingleProductDetails } from "@/controllers/productControllers";

const handler = nc({ onError });
db();

handler.get(getSingleProductDetails);

export default handler;
