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