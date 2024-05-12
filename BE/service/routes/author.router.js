import { Router } from "express";
import { avatarCloud } from "../middleware/multer.js";
import User from "../model/user.model.js";
import Post from "../model/blogPost.model.js";
import Comment from "../model/comment.model.js"
import { authMiddleware } from "../middleware/authorization.js";

export const authorRouter = Router();

// Chiamata di tutti gli autori
authorRouter.get("/", async (req, res, next) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (err) {
      next(err);
    }
});

authorRouter.get("/:id/blogPost", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if(user) {
      let post = await Post.find({
        author: user._id,
      });
      
      res.send(post)
    }
  } catch (err) {
    next(err);
  }
});

authorRouter.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
})

authorRouter.get("/:id", async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id);
      res.send(user);
    } catch (err) {
      next(err)
    }
})

  authorRouter.put("/:id", authMiddleware, async (req, res, next) => {
    try {
      let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  });

  authorRouter.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id);
      
      if(user) {
        await Post.deleteMany({author: req.params.id});
        await Comment.deleteMany({author: req.params.id});
        await User.findByIdAndDelete({_id: req.params.id});

        res.sendStatus(204);
      }
    } catch (err) {
      next(err);
    }
  });

  authorRouter.patch("/:id/avatar", avatarCloud.single("avatar"), async (req, res, next) => {
    try {
      let avatarUser = await User.findByIdAndUpdate(
        req.params.id,
        { avatar: req.file.path },
        { new: true }
      );
      res.send(avatarUser);
    } catch (err) {
      next(err);
    }
  })