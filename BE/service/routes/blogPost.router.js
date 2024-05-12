import { Router } from "express";
import Post from "../model/blogPost.model.js"
import Comment from "../model/comment.model.js";
import User from "../model/user.model.js";
import { coverCloud } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authorization.js";

export const blogPostRouter = Router();

blogPostRouter.get("/", async (req, res, next) => {
    try {
        let posts;
       const query = req.query.title;

       if(query) {
        posts = await Post.find({title: {$eq: query }})
       } else {
        posts = await Post.find().populate("author", "comments");
       }
       res.send(posts);
    } catch (err) {
        next(err);
    }
})

blogPostRouter.get("/:id", async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id).populate("author", "comments");

        if(post) {
            res.send(post);
        };
    } catch (err) {
        next(err);
    }
})

blogPostRouter.post("/", authMiddleware, async (req, res, next) => {
    try {
        let post = await Post.create({
            ...req.body,
            author: req.user._id
        });

        let author = await User.findById(req.user._id);
        author.posts.push(post._id);
        await author.save();

        res.send(post);
    } catch (err) {
        next(err);
    }
})

blogPostRouter.put("/:id", authMiddleware, async (req, res, next) => {
    try {
       let post = await Post.findById(req.params.id);

       if(post) {
        const upPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(upPost);
    };
} catch (err) {
        next(err);
    }
})

blogPostRouter.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
       let post = await Post.findById(req.params.id);

       if(post) {
        await Comment.deleteMany({post: req.params.id});
        await Post.findByIdAndDelete({_id: req.params.id});
       };

       res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

blogPostRouter.patch("/:id/cover", coverCloud.single("cover"), async (req, res, next) => {
    try {
        let coverPost = await Post.findByIdAndUpdate(
            req.params.id,
            { cover: req.file.path },
            { new: true }
        );
        res.send(coverPost);
    } catch (err) {
       next(err); 
    }
});

// Sezione commenti

blogPostRouter.get("/:id/comments", async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id).populate({
            path: "comments",
            populate: {
                path: "author",
                select: ["name", "surname", "avatar"]
            },
        });

        if(post) {
            res.send(post.comments)
        }
    } catch (err) {
        next(err);
    }
});

blogPostRouter.get("/:id/comments/:commentId", async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id)

        if(post) {
            let comment = await Comment.findById(req.params.commentId).populate("author", "name surname avatar");

            if(comment) {
                res.send(comment);
            };
        };
    } catch (err) {
        next(err);
    }
});

blogPostRouter.post("/:id", authMiddleware, async (req, res, next) => {
    try {
        let newComment = await Comment.create({
            author: req.body.author,
            text: req.body.text
           });
    
           let post = await Post.findById(req.params.id);
    
           if(post) {
            post.comments.push(newComment._id);
            await post.save();
            res.send(newComment);
           };
    
           let author = await User.findById(req.user.id);
           author.comments.push(newComment._id);
           await author.save();
    } catch (err) {
        next(err);
    }
});

blogPostRouter.put("/:id/comments/:commentId", async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if(post) {
            let comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {new: true});

            if(comment) {
                await comment.save();
                res.send(comment);
            };
        };

        

    } catch (err) {
        next(err);
    }
});

blogPostRouter.delete("/:id/comments/:commentId", authMiddleware, async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if(post) {
            let comment = await Comment.findById(req.params.commentId);

            if(comment) {
                post.comments.pull(comment);
                await post.save();

                await Comment.deleteOne({_id: req.params.commentId})
                res.status(204).send("Commento eliminato")
            }
        }
    } catch (err) {
        next(err);
    }
})