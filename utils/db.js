import mongoose from "mongoose";

const connectTodb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect("mongodb://127.0.0.1:27017/todoProject");
    console.log("Mongo db connect");
  } catch (error) {}
};

export default connectTodb;
