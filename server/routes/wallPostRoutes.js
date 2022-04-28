import wallPostModel from './../models/post.model.js';
import Express from 'express';

export const router = Express.Router();
router.use(Express.json());

/** ---- GET ----- */
/** ---- ALL POSTS----- */

router.get('/wallposts', async (req, res) => {
  try {
    const wallPosts = await wallPostModel.find({});

    res.json(wallPosts);
  } catch (err) {
    console.log(err);
    res.json('Error has occured');
  }
});
/** ---- ONE POST----- */
router.get('/wallposts/:user', async (req, res) => {
  try {
    const wallPost = await wallPostModel.findOne({ user: req.params.user });
    res.json(wallPost);
  } catch (err) {
    console.log(err);
    res.json('error has occured');
  }
});

/** ---- POST ----- */
/** ---- CREATE A NEW POST---- */
router.post('/wallposts/newpost', async (req, res) => {
  try {
    const newPost = new wallPostModel({
      username: req.body.username,
      body: req.body.body,
    });
    await newPost.save({ username: req.body.username, body: req.body.body });
    return res.json('new post has been created');
  } catch (err) {
    if (err.code === 11000) {
      res.json('Oops try again');
      return;
    }
    res.json('An error occured ' + err);
  }
});

/** ---- PUT ------ */
/** ---- EDIT/ UPDATE ----- */

router.put('/wallposts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const wallPost = await wallPostModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    wallPost.save();
    res.json({
      old: wallPost,
      new: req.body,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.json('Wall post already exists');
      return;
    }
    res.json('An error occured');
  }
});

/** ----DELETE----- */
/** ---- DELETE A POST----- */

router.delete('/wallposts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removedWallPost = await wallPostModel.findByIdAndRemove(id);
    if (!removedWallPost) {
      res.json('Wall post not found');
      return;
    }
    res.json(removedWallPost);
  } catch (err) {
    res.json('An error occured');
  }
});

export default router;
