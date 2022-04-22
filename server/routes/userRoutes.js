import userModel from "./../models/user.model.js";
import express from "express";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session";
import { v4 as uuid } from "uuid";

export const router = express.Router();
router.use(express.json());

/** Setup secure cookie */
router.use(
  cookieSession({
    name: "session",
    secret: "k3y",
    secure: false,
    maxAge: 1000 * 100,
    httpOnly: true,
  })
);

/** ----GET----- */

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.send("An error occured");
  }
});

router.get("/users/:username", async (req, res) => {
  try {
    const users = await userModel.findOne({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.send("An error occured");
  }
});

/** ----POST----- */
/** ----CREATE A NEW TWAT---- */
router.post("/users/register", async (req, res) => {
  console.log("HEJ");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    console.log(user);
    await user.save({ username: req.body.username, password: hashedPassword });
    return res.json(
      `A new TWAT with username '${user.username}' has signed up!`
    );
  } catch (err) {
    if (err.code === 11000) {
      res.json("Username already exists");
      return;
    }
    res.json("An error occured");
  }
});
/** ----POST----- */
/** ----LOG IN---- */

router.post("/login", async (req, res) => {
  console.log("Signed in!");
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res
      .status(401)
      .send("Sorry TWAT! Wrong username or password. Try again!");
  }
  if (req.session.id) {
    return res.json("Idiot! You are already signed in");
  }
  req.session.id = uuid();
  req.session.email = req.body.email;
  req.session.signedInAt = new Date();
  res.json(`'${user.username}' just logged in!!`);
});
/** ---- PUT ----- */

router.put("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOneAndUpdate(username, req.body);
    user.save();
    res.json({
      old: user,
      new: req.body,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.send("Username already exists");
      return;
    }
    res.send("An error occured");
  }
});

/** ---- DELETE ----- */

router.delete("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const removedUser = await userModel.findOneAndRemove(username);
    if (!removedUser) {
      res.send("User not found");
      return;
    }
    res.json(removedUser);
  } catch (err) {
    res.send("An error occured");
  }
});

/** ---- SIGN OUT ----- */

router.delete("/logout", (req, res) => {
  if (!req.session.id)
    return res
      .status(401)
      .json("Hey dummy! You can't log out when you are not logged in...");
  req.session = null;
  res.json("You are now logged out.");
});

router.get("/account/login", (req, res) => {
  // Check if we are authorized (e.g logged in)
  if (!req.session.id) {
    return res.status(401).send("You are not logged in");
  }
  // Send info about the session (a cookie stored on the clinet)
  res.json(req.session);
});
export default router;
