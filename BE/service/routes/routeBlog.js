import { Router } from "express";
import Blogs from "../models/modelBlog.js";
import Comment from "../models/modelComment.js";
import Cloudinary from "../middelware/multer.js"
import { authMiddleware } from "../middelware/auth.js";
export const routeBlog = Router()

routeBlog.get("/", async (req, res, next) => {
    try {
        //http://localhost:3001/blogs?title=tech&page=3

        const page = req.query.page || 1
        let blogs = await Blogs.find(
            req.query.title ? { title: { $regex: req.query.title } } : {}
        )
            .limit(20)
            .skip(20 * (page - 1))
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    select: ["name", "lastName", "avatar"],
                },
                options: {
                    limit: 2,
                },
            })
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})

routeBlog.get("/:id", async (req, res, next) => {
    try {
        let blog = await Blogs.findById(req.params.id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

routeBlog.put("/:id", async (req, res, next) => {
    try {
        let blog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

routeBlog.patch("/:id/cover", Cloudinary, async (req, res, next) => {
    try {
        let blog = await Blogs.findByIdAndUpdate(
            req.params.id,
            { cover: req.file.path },
            {
                new: true,
            }
        )
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

routeBlog.get("/:id/comments", async (req, res, next) => {
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
routeBlog.post("/:id/comments", authMiddleware, async (req, res, next) => {
    try {
        let comm = new Comment({ ...req.body, author: req.user._id })
        await comm.save()

        await Blogs.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: comm._id,
            },
        })
        res.send(comm)
    } catch (error) {
        next(error)
    }
})
routeBlog.get("/:id/comments/:commentId", async (req, res, next) => {
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
routeBlog.put("/:id/comments/:commentId", async (req, res, next) => {
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
routeBlog.delete("/:id/comments/:commentId", async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

routeBlog.delete("/:id", async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

routeBlog.post("/", authMiddleware, async (req, res, next) => {
    try {
        let blog = await Blogs.create({ ...req.body, author: req.user._id })
        const msg = {
            to: req.body.email, // Change to your recipient
            from: "...", // Change to your verified sender
            subject: "Grazie per aver postato su Strive Blog",
            html: `Hai postato un articolo "${req.body.title}" su Strive Blog.`,
        }
        await sgMail.send(msg)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
export default routeBlog;