import mongoose from "mongoose";

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", schema);

export default userModel;
