import mongoose from "mongoose";

const wallPostSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
});

export default mongoose.model("wallPost", wallPostSchema);
