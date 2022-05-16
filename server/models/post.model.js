import mongoose from "mongoose";

const wallPostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  body: {
    required: true,
    type: String,
    unique: false
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("wallPost", wallPostSchema);
