import express from "express";
import cookieSession from "cookie-session";
import bcrypt from "bcrypt";

export const router = express.Router();

/** Mocked data */
let users = [];
let user = {
  username: "2cuul4scuul",
  password: "password",
  email: "mail@gmail.com",
  userId: "id1",
};
users.push(user);

/** server for users */

/** Setup secure cookie */
router.use(
  cookieSession({
    name: "session",
    secret: "k3y",
    secure: false,
    maxAge: 1000 * 60,
    httpOnly: true,
  })
);

/** ----GET----- */

router.get("/users", (req, res) => {
  res.status(200).json(users);
});

router.get("users/:username", (req, res) => {
  const foundUser = users.find((user) => req.params.username === user.username);
  res.status(200).json(foundUser);
});

/** ----POST----- */

router.post("/users/login", async (req, res) => {
  const { name, password } = req.body;
  const foundUser = users.find((user) => user.name === name);

  /** Checks if user is found */
  if (!foundUser || !(await bcrypt.compare(password, user.password))) {
    res
      .status(401)
      .json("Incorrect username or password. Check spelling and try again");
    return;
  }

  /** Creates session */
  req.session.username = user.username;
  req.session.role = "admin";

  res.status(200).json(null);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const foundExistingUserName = users.find((user) => user.name === name);
  const foundExistingUserEmail = users.find((user) => user.email === email);

  if (foundExistingUserName) {
    return res.status(400).json("Username already taken. Try another one.");
  }

  if (foundExistingUserEmail) {
    return res.status(400).json("Account with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    name,
    password: hashedPassword,
  };

  users.push(user);
  res.status(200).json();
});

/** ---- PUT ----- */

router.put("/users/:id", (req, res) => {
  const foundUser = users.find((user) => req.params.id === user.userId);

  if (!foundUser) {
    res.status(400).json(`could not find user with id ${req.params.id}`);
    return;
  }

  let updatedUsersList = users.map((user) => {
    if (user.id === req.body.id) {
      return req.body;
    } else {
      return user;
    }
  });

  users = updatedUsersList;
  res.status(200).json(updatedUsersList);
});

/** ---- DELETE ----- */

router.delete("/users/:id", (req, res) => {});

export default router;
