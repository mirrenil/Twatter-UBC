import express from "express";
import userRouter from "./routes/users";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);

app.use("/", express.static("public"));

app.listen(port, () =>
  console.log(`App is running on port: http://localhost:${port}.`)
);
