import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import bcrypt from "bcrypt";
import userRouter from "./routes/userRoutes.js";

mongoose.connect(
  "mongodb://localhost:27017/usersDB",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Error connecting to database");
    }
    console.log("Connected to database");
  }
);

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/", userRouter);

/** Setup secure cookie */
app.use(
  cookieSession({
    name: "session",
    secret: "k3y",
    secure: false,
    maxAge: 1000 * 60,
    httpOnly: true,
  })
);

app.listen(PORT, () =>
  console.log(`App is running on port: http://localhost:${PORT}.`)
);
