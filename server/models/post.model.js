import mongoose from "mongoose";

const WallPostSchema = mongoose.Schema({
  user: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
});

export default mongoose.model("wallPost", userSchema);
