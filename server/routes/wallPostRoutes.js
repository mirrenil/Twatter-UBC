import wallPostModel from "./../models/post.model.js";
import Express from "express";

export const router = Express.Router();
router.use(Express.json());

/ ----GET----- */;

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

router.get("/wallposts/:user", async (req, res) => {
  try {
    const wallPost = await wallPostModel.findOne({ user: req.params.user });
    res.json(wallPost);
  } catch (err) {
    console.log(err);
    res.send("error has occured");
  }
});

/ ----POST----- */;

// router.post("/wallposts/newpost", async (req, res) => {
//   console.log(req);
//   console.log(res);
//   try {
//     const newWallPost = new wallPostModel({
//       username: req.body.username,
//       body: req.body.body,
//     });
//     console.log(newWallPost);
//     await newWallPost.save();
//     res.json(newWallPost);
//   } catch (err) {
//     if (err.code === 1100) {
//       res.send("Something went wrong");
//       return;
//     }
//     res.send("An error has occurd " + err);
//   }
// });

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

router.put("/wallposts/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const wallPost = await wallPostModel.findOneAndUpdate(user, req.body);
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

router.delete("/wallposts/:user", async (req, res) => {
  try {
    const { user } = req.params;

    const removedWallPost = await wallPostModel.findOneAndRemove({
      user: req.params.user,
    });
    if (!removedWallPost) {
      res.send("Wall post not found");
      return;
    }
    res.json(removedWallPost);
  } catch (err) {
    res.send("An error occured");
  }
});

export default router;
