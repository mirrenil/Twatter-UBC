import wallPostModel from './../models/post.model.js';
import Express from 'express';

export const router = Express.Router();
router.use(Express.json());

/** ---- GET ----- */
/** ---- ALL POSTS----- */

router.get('/wallposts', async (req, res) => {
  try {
    const wallPosts = await wallPostModel.find({});
    if(wallPosts.length < 1) {
      res.status(404).json('Seems like the wall is empty of posts :(')
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
  try {
    const newPost = new wallPostModel({
      username: req.body.username,
      body: req.body.body,
    });
    await newPost.save({ username: req.body.username, body: req.body.body });
    return res.json('new post has been created');
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json('Oops try again');
      return;
    }
    res.status(400).json('An error occured ' + err);
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
      res.status(400).json('Wall post already exists');
      return;
    }
    res.status(400).json('An error occured');
  }
});

/** ----DELETE----- */
/** ---- DELETE A POST----- */

router.delete('/wallposts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removedWallPost = await wallPostModel.findByIdAndRemove(id);
    if (!removedWallPost) {
      res.status(404).json('Wall post not found');
      return;
    }
    res.json(removedWallPost);
  } catch (err) {
    res.status(400).json('An error occured');
  }
});

export default router;
