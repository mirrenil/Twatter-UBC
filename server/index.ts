import express from "express";
import userRouter from "./routes/users.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", userRouter);

app.use("/", express.static("public"));

app.listen(port, () =>
  console.log(`App is running on porrst: http://localhost:${port}.`)
);
