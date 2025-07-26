import mongoose from "mongoose";
import { DB_name } from "../constants.js";


const connectDB1 = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODG_URL}/${DB_name}`);
    console.log(`\nMongoDB connected!! DB Host ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB1;