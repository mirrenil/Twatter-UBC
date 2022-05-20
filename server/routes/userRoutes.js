import userModel from "./../models/user.model.js";
import express from "express";
import bcrypt from "bcrypt";
export const router = express.Router();
router.use(express.json());

/** ----GET----- */
/** ---ALL USERS----- */

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length < 1) {
      res.status(404).json("no users found");
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

/** ---ONE USER----- */
router.get("/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userModel.find({ username });

    if (user.length < 1) {
      return res.status(400).json("User with this username does not exist");
    }

    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

/**------cookiesession------- */
router.get("/login", (req, res) => {
  if (!req.session.user) {
    return res.status(400).json("no user is logged in");
  }
  res.status(200).json(req.session.user);
});

/** ----POST----- */

/** ----CREATE A NEW TWAT---- */
router.post("/users/register", async (req, res) => {
  if (req.session.user) {
    return res
      .status(400)
      .json("You cant be logged in if you want to create a new user");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    await user.save({ username: req.body.username, password: hashedPassword });
    return res.json(
      `A new TWAT with username '${user.username}' has signed up!`
    );
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json("Username already exists");
      return;
    }
    res.status(400).json("An error occured");
  }
});
/** ----POST----- */
/** ----LOG IN---- */

router.post("/login", async (req, res) => {
  try {
    const user = await userModel
      .findOne({ username: req.body.username })
      .select("+password");
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(401)
        .json("Sorry TWAT! Wrong username or password. Try again!");
    }

    if (req.session.user) {
      return res
        .status(409)
        .json(
          "You are already logged in. Sign out if you want to switch account"
        );
    }

    delete user.password;
    req.session.user = user;
    res.json(req.session.user);
  } catch (err) {
    res.status(400).json(err);
  }
});

/** ---- SIGN OUT ----- */

router.delete("/logout", (req, res) => {
  try {
    if (!req.session.user) {
      return res
        .status(401)
        .json("Hey dummy! You can't log out when you are not logged in...");
    }
    req.session = null;
    res.json("You are now logged out!");
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
