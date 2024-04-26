import { Router } from "express";
import Author from "../models/modelAuthor.js";
import CloudinaryMiddelware from "../middelware/multer.js";
export const authorRoute = Router();

authorRoute.get("/", async (req, res, next) => {
    try {
        let authors = await Author.find()
            .limit(20)
            .skip(20 * (page - 1))
        res.send(authors)
    } catch (error) {
        next(error)
    }
});

authorRoute.get("/:id", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id)
        if (!author) {
            return res.status(404).send({ error: "author not found." });
        }
        res.send(author);
    } catch (err) {
        next(err);
    }
});
authorRoute.get("/:id/blogPosts", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id)

        let posts = await Blog.find({
            author: author.email,
        })
        res.send(posts)
    } catch (error) {
        next(error)
    }
})
authorRoute.post("/", async (req, res, next) => {
    try {
        let author = await Author.create(req.body);
        res.status(201).send(author);
    } catch (err) {
        next(err);
    }
});

authorRoute.put("/:id", async (req, res, next) => {
    try {
        let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!author) {
            return res.status(404).send({ error: "author not found." });
        }
        res.send(author);
    } catch (err) {
        next(err);
    }
});

authorRoute.delete("/:id", async (req, res, next) => {
    try {
        await Author.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});
authorRoute.get("/:id/avatar", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id)
        if (!author) {
            return res.status(404).send({ error: "author not found." });
        }
        res.send(author);
    } catch (err) {
        next(err);
    }
});
authorRoute.patch("/:id/avatar", CloudinaryMiddelware, async (req, res, next) => {
    try {

        let authorUpdate = await Author.findByIdAndUpdate(
            req.params.id,
            { avatar: req.file.path },
            { new: true }
        );

        if (!authorUpdate) {
            return res.status(404).send({ error: "Author not found." });
        }

        res.send(authorUpdate);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default authorRoute;