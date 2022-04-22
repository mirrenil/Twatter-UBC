import userModel from "./../models/user.model.js";
import express from "express";

export const router = express.Router();
router.use(express.json());

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

router.post("/users/register", async (req, res) => {
  console.log("HEJ");
  try {
    const user = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    console.log(user);
    await user.save();
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.send("Username already exists");
      return;
    }
    res.send("An error occured");
  }
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

export default router;
