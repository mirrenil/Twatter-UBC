import mongoose from "mongoose";

const wallPostSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  body: {
    required: true,
    type: String,
    unique: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("wallPost", wallPostSchema);
