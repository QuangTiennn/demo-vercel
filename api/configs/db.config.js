import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDatabase = async () => {
  try {
    // const connectionString = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;

    // console.log(connectionString, "[<<<------- connectionString ------->>>]");

    // const dbUser = process.env.MONGODB_USER;
    // const dbPassword = process.env.MONGODB_PASSWORD;
    // const dbName = process.env.MONGODB_DATABASE;

    await mongoose.connect(
      // `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      "mongodb+srv://nguyenquangtien9787:quangtien2212@cluster0.pabdxzp.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "todoapp",
      }
    );

    console.log(`⚡️[database]: Connected to database`);
  } catch (error) {
    console.log("error during connecting to mongo: ");
    console.error(error);
  }
};
