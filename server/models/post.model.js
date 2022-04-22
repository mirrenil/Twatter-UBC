import mongoose from "mongoose";

const wallPostSchema = new mongoose.Schema({
  user: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  body: {
    required: true,
    type: String,
  },
});

export default mongoose.model("wallPost", wallPostSchema);
