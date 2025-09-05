import mongoose from "mongoose";
import userModel from "./user";
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  finish: {
    type: Boolean,
    required: true,
  },
  user : {
    type: mongoose.Types.ObjectId,
    ref:'user',
    required:true
  }
});

const todoModel = mongoose.models.todo || mongoose.model("todo", schema);

export default todoModel;
