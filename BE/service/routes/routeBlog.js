import { Router } from "express";
import BlogPost from "../models/modelBlog.js";

export const blogApi = Router();

blogApi.get("/", async (req, res, next) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        next(error);
    }
});
blogApi.get("/:id", async (req, res, next) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found." });
        }
        res.json(blogPost);
    } catch (err) {
        next(err);
    }
});

blogApi.post("/", async (req, res, next) => {
    try {
        const newPost = new BlogPost(req.body);
        await newPost.save();
        res.status(201).json({ message: "Blog post created successfully", post: newPost });
    } catch (err) {
        next(err);
    }
});

blogApi.put("/:id", async (req, res, next) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Return updated post
        if (!updatedPost) {
            return res.status(404).json({ message: "Blog post not found." });
        }
        res.json({ message: "Blog post updated successfully", post: updatedPost }); // Send message and updated post
    } catch (err) {
        next(err);
    }
});

blogApi.delete("/:id", async (req, res, next) => {
    try {
        await BlogPost.deleteOne({ _id: req.params.id });
        res.status(204).send(); // No content response (204)
    } catch (err) {
        next(err);
    }
});

export default blogApi;
