import wallPostModel from "./../models/post.model.js";
import Express from "express";

export const router = Express.Router();
router.use(Express.json());

/** ---- GET ----- */
/** ---- ALL POSTS----- */

router.get("/wallposts", async (req, res) => {
  try {
    const wallPosts = await wallPostModel.find({});

    console.log(wallPosts);

    res.json(wallPosts);
  } catch (err) {
    console.log(err);
    res.send("Error has occured");
  }
});
/** ---- ONE POST----- */
router.get("/wallposts/:user", async (req, res) => {
  try {
    const wallPost = await wallPostModel.findOne({ user: req.params.user });
    res.json(wallPost);
  } catch (err) {
    console.log(err);
    res.send("error has occured");
  }
});

/** ---- POST ----- */
/** ---- CREATE A NEW POST---- */
router.post("/wallposts/newpost", async (req, res) => {
  console.log("HEJ");
  try {
    const newPost = new wallPostModel({
      username: req.body.username,
      body: req.body.body,
    });
    console.log(newPost);
    await newPost.save({ username: req.body.username, body: req.body.body });
    return res.json("new post has been created");
  } catch (err) {
    if (err.code === 11000) {
      res.json("Oops try again");
      return;
    }
    res.json("An error occured " + err);
  }
});

/** ---- PUT ------ */
/** ---- EDIT/ UPDATE ----- */

router.put("/wallposts/:id", async (req, res) => {
  console.log(req);
  console.log(req.params);
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
      res.send("Wall post already exists");
      return;
    }
    res.send("An error occured");
  }
});

/** ----DELETE----- */
/** ---- DELETE A POST----- */

router.delete("/wallposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedWallPost = await wallPostModel.findByIdAndRemove(id);
    if (!removedWallPost) {
      res.json("Wall post not found");
      return;
    }
    res.json(removedWallPost);
  } catch (err) {
    res.send("An error occured");
  }
});

export default router;
