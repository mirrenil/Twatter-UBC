import userModel from './../models/user.model.js';
import express from 'express';
import bcrypt from 'bcrypt';
import cookieSession from 'cookie-session';
import { v4 as uuid } from 'uuid';

export const router = express.Router();
router.use(express.json());

/** ----GET----- */
/** ---ALL USERS----- */

router.get('/users', async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log(users);
    if (users.length < 1) {
      res.status(404).json('no users found');
    } else {
      res.json(users);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('An error occured');
  }
});

/** ---ONE USER----- */
router.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  console.log(username);

  const user = await userModel.find({ username });
  console.log(user);
  if (user.length < 1)
    return res.status(400).json('User with this username does not exist');

  try {
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json('An error occured');
  }
});

/**------cookiesession------- */
router.get('/login', (req, res) => {
  console.log('in cookiesession');
  

  if(!req.session.user) {
    return res.status(400).json('no user is logged in')
  }
  // console.log(req.session.user)
  res.status(200).json(req.session.user);
});

/** ----POST----- */

/** ----CREATE A NEW TWAT---- */

router.post('/users/register', async (req, res) => {
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
      res.status(400).json('Username already exists');
      return;
    }
    res.status(400).json('An error occured');
  }
});
/** ----POST----- */
/** ----LOG IN---- */

router.post('/login', async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res
      .status(401)
      .json('Sorry TWAT! Wrong username or password. Try again!');
  }
  if (req.session.id) {
    return res.status(409).json('Idiot! You are already signed in');
  }

  delete user.password;
  req.session.user = user;
  res.json(`'${user.username}' just logged in!!` + user);
});
/** ---- PUT ----- */
/** ---- UPDATE ----- */

router.put('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    if (!username || username.length < 1) {
      res.status(400).json('Cannot continue without username');
    } else {
      const user = await userModel.findOneAndUpdate(username, req.body);
      user.save();
      res
        .json({
          old: user,
          new: req.body,
        })
        .status(200);
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json('Username already exists');
      return;
    }
    res.status(400).json('An error occured');
  }
});

/** ---- DELETE ----- */
/** ---- DELETE USER ----- */

router.delete('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const removedUser = await userModel.findOneAndRemove(username);
    if (!removedUser) {
      res.status(404).json('User not found');
      return;
    }
    res.json(removedUser);
  } catch (err) {
    res.status(400).json('An error occured');
  }
});

/** ---- SIGN OUT ----- */

router.delete('/logout', (req, res) => {
  if (!req.session.user)
    return res
      .status(401)
      .json("Hey dummy! You can't log out when you are not logged in...");
  req.session = null;
  res.json('You are now logged out.');
});

// router.get('/account/login', (req, res) => {
//   // Check if we are authorized (e.g logged in)
//   if (!req.session.id) {
//     return res.status(401).json('You are not logged in');
//   }
//   // Send info about the session (a cookie stored on the clinet)
//   res.json(req.session);
// });

export default router;
