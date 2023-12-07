import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nguyenquangtien9787:quangtien2212@cluster0.pabdxzp.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "todoapp",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Set the timeout
      }
    );

    console.log(`⚡️[database]: Connected to database`);
  } catch (error) {
    console.log("error during connecting to mongo: ");
    console.error(error);
  }
};
