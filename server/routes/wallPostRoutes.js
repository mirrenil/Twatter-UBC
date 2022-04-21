import wallPostModel from "./../models/post.model.js";
import Express from 'express'

export const router = Express.Router();

/** ----GET----- */

router.get("/wallposts", (req, res) => {
  try {
    const wallPosts = wallPostModel.find({});
    res.json(wallPosts);
  } catch (err) {
    console.log(err);
    res.send("Error has occured");
  }
});

router.get("/wallposts/:id", (req, res) => {
  try {
    const wallPost = wallPostModel.findOne({});
    res.json(wallPost);
  } catch (err) {
    console.log(err);
    res.send("error has occured");
  }
});

/** ----POST----- */

router.post("/", (req, res) => {
  const date = toString(new Date());
  try {
    const newWallPost = new wallPostModel({
      user: req.body.username,
      date: date,
    });
    console.log(newWallPost)
    await newWallPost.save();
    res.json(newWallPost)
  } catch (err) {
    if (err.code === 404) {
        res.send("Something went wrong");
        return
    }
    res.send('an error has occurd')
  }
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});
