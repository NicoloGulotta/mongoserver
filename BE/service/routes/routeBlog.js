import { Router } from "express";
import Blogs from "../models/modelBlog.js";
import Comment from "../models/modelComment.js";
import Cloudinary from "../middelware/multer.js"
export const blogRoute = Router()

blogRoute.get("/", async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        let blogs = await Bolog.find(
            req.query.title ? { titile: { $regex: req.query.title } } : {}
        )
            .limit(20)
            .skip(20 * (page - 1))
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    select: ["name", "lastNmae", "avatar"],
                },
                options: {
                    limit: 2
                }
            })
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})
blogRoute.get("/:id", async (req, res, next) => {
    try {
        let blog = await Blogs.findById(req.params.id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
blogRoute.put("/:id", async (req, res, next) => {
    try {
        let blog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

blogRoute.patch("/:id/cover", Cloudinary, async (req, res, next) => {
    try {
        let blog = await Blogs.findByIdAndUpdate(
            req.params.id,
            { cover: req.file.path },
            { new: true, }
        )
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
blogRoute.get("/:id/comments", async (req, res, next) => {
    try {
        let post = await Blogs.findById(req.params.id).populate({
            path: "comments",
            populate: {
                path: "author",
                select: ["name", "lastName", "avatar"],
            },
        })
        if (post) {
            res.send(post.comments)
        } else res.sendStatus(404)
    } catch (error) {
        next(error)
    }
})
blogRoute.get("/:id/comments/:commentsId", async (req, res, next) => {
    try {
        let comment = await Comment.findById(req.params.commentId).populate({
            path: "author",
            select: ["name", "lastName", "avatar"],
        })

        res.send(comment)
    } catch (error) {
        next(error)
    }
})
blogRoute.put("/:id/comments/:commentId", async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,
            { new: true }
        )
        res.send(comment)
    } catch (error) {
        next(error)
    }
})
blogRoute.delete("/:id", async (req, res, next) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

// blogRoute.post("/", async (req, res, next) => {
//     try {
//       let blog = await Blog.create(req.body)
//       const msg = {
//         to: req.body.email, // Change to your recipient
//         from: "...", // Change to your verified sender
//         subject: "Grazie per aver postato su Strive Blog",
//         html: `Hai postato un articolo "${req.body.title}" su Strive Blog.`,
//       }
//       await sgMail.send(msg)
//       res.send(blog)
//     } catch (error) {
//       next(error)
//     }
//   })
export default blogRoute