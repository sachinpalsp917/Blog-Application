import mongoose from "mongoose";
import { config } from "../config/app.config";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
};

export default connectToDatabase;
