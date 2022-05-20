import wallPostModel from './../models/post.model.js';
import Express from 'express';

export const router = Express.Router();
router.use(Express.json());

/** ---- GET ----- */
/** ---- ALL POSTS----- */

router.get('/wallposts', async (req, res) => {
  try {
    const wallPosts = await wallPostModel.find({});
    if(!wallPosts.lenght) {
      return res.status(404).json(wallPosts);
    }
    res.json(wallPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

/** ---- GET ONE POST ----- */
router.get('/wallpost/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const wallPost = await wallPostModel.findById(id);
    if (!wallPost) {
      return res.status(404).json(wallPost);
    }
    res.json(wallPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

/** ---- POST ----- */
/** ---- CREATE A NEW POST---- */
router.post('/wallposts/newpost', async (req, res) => {
  const loggedInUser = req.session.user;
  if (!loggedInUser) {
    return res.status(403).json('You cant post if youre not logged in');
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
      return res
        .status(418)
        .json(
          'Why post something someone else has already posted? Be original, pls...'
        );
    }
  }
});

/** ---- PUT ------ */
/** ---- EDIT/ UPDATE ----- */

router.put('/wallposts/:id', async (req, res) => {
  const { id } = req.params;
  const currentPost = await wallPostModel.findById(id);
  const loggedInUser = req.session.user;
  console.log('in put wallpost')

  try {
    console.log('in try')
    if (!loggedInUser) {
      return res.status(403).json('Nooooo stop!! You have to sign in first...stupid');
    } else if (!currentPost) {
      return res.status(404).json('no post found');
    }
    console.log(currentPost.username)
    console.log(req.session.user.username)

    if (currentPost.username === req.session.user.username) {
      console.log('currentpost username stämmmer med req session')
      const wallPost = await wallPostModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      });
      wallPost.save();
      res
        .json({
          old: wallPost,
          new: req.body,
        })
        .status(200);
    } else {
      return res.status(403).json('u cant edit other peoples posts just like that... ur mean')
    }
  } catch (err) {
    return res.status(400).json(err);
  }
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
    return res.status(404).json('no post found');
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
      return res.status(400).json(err);
    }
  } else {
    res.status(403).json('U obviously cant delete someone elses post');
  }
});

export default router;
