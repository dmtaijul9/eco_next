import nc from "next-connect";

import onError from "@/middlewares/errors";
import db from "@/config/db";
import { registerUser } from "@/controllers/authControllers";

const handler = nc({ onError });
db();

handler.post(registerUser);

export default handler;
