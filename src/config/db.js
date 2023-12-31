import mongoose from "mongoose";

const db = () => {
  if (mongoose.connections.readyState >= 1) {
    return;
  }

  mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URI)
    .then((con) => console.log("Connected to MongoDB"));
};

export default db;
