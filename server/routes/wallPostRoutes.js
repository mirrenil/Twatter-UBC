import wallPostModel from './../models/post.model.js';
import Express from 'express';

export const router = Express.Router();
router.use(Express.json());

/** ---- GET ----- */
/** ---- ALL POSTS----- */

router.get('/wallposts', async (req, res) => {
  try {
    const wallPosts = await wallPostModel.find({});
    if (wallPosts.length < 1) {
      res.status(404).json('Seems like the wall is empty of posts :(');
    } else {
      res.json(wallPosts);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('Error has occured');
  }
});

/** ---- GET ONE POST----- */
router.get('/wallposts/:user', async (req, res) => {
  try {
    const wallPost = await wallPostModel.findOne({ user: req.params.user });
    res.json(wallPost);
  } catch (err) {
    console.log(err);
    res.status(400).json('error has occured');
  }
});

/** ---- POST ----- */
/** ---- CREATE A NEW POST---- */
router.post('/wallposts/newpost', async (req, res) => {
  const loggedInUser = req.session.user;
  console.log(req.session.user);
  console.log(req.body.body);

  if (!loggedInUser) {
    return res
      .status(403)
      .json('Nooooo stop!! You have to sign in first...stupid');
  }
  if (loggedInUser) {
    try {
      const newPost = new wallPostModel({
        username: req.session.user.username,
        body: req.body.body,
      });
      await newPost.save();
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(400).json('Oops try again ' + err);
    }
  }
});

/** ---- PUT ------ */
/** ---- EDIT/ UPDATE ----- */

router.put('/wallposts/:id', async (req, res) => {
  const { id } = req.params;
  const currentPost = await wallPostModel.findById(id);
  const loggedInUser = req.session.user;

  if (!loggedInUser) {
    return res
      .status(403)
      .json('Nooooo stop!! You have to sign in first...stupid');
  } else if (!currentPost) {
    return res.status(400).json('no post found');
  }

  if (currentPost.username === req.session.user.username) {
    try {
      const wallPost = await wallPostModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      });
      wallPost.save();
      res.json({
        old: wallPost,
        new: req.body,
      });
    } catch (err) {
      return res.status(400).json('An error occured');
    }
  }

  // try {

  //   const wallPost = await wallPostModel.findByIdAndUpdate(id, req.body, {
  //     useFindAndModify: false,
  //   });
  //   wallPost.save();
  //   res.json({
  //     old: wallPost,
  //     new: req.body,
  //   });
  // } catch (err) {
  //   if (err.code === 11000) {
  //     res.status(400).json('Wall post already exists');
  //     return;
  //   }
  //   res.status(400).json('An error occured');
  // }
});

/** ----DELETE----- */
/** ---- DELETE A POST----- */

router.delete('/wallposts/:id', async (req, res) => {
  const { id } = req.params;
  const currentPost = await wallPostModel.findById(id);
  const loggedInUser = req.session.user;

  if (!loggedInUser) {
    return res.status(401).json('You must sign in first');
  } else if (!currentPost) {
    return res.status(400).json('no post found');
  }

  if (currentPost.username === req.session.user.username) {
    try {
      const removedWallPost = await wallPostModel.findByIdAndRemove(id);
      if (!removedWallPost) {
        res.status(404).json('no wallpost found');
      } else {
        return res.status(200).json('post removed');
      }
    } catch (err) {
      return res.status(400).json('An error occured');
    }
  }
});

export default router;
