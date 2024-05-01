import { Router } from "express";
import Author from "../models/modelAuthor.js";
import Cloudinary from "../middelware/multer.js";
import { authMiddleware, generateJWT } from "../middelware/auth.js";
export const authorRoute = Router();

authorRoute.get("/", async (req, res, next) => {
    try {
        const page = req.query.page || 1
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
        let author = await Author.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });
        res.status(201).send(author);
    } catch (err) {
        next(err);
    }
});
authRouter.get("/profile", authMiddleware, async (req, res, next) => {
    // Utilizzando il middleware authMiddleware, l'oggetto  req
    // avrà il parametro user popolato con i dati presi dal database
    try {
        let user = await Author.findById(req.user.id);

        res.send(user);
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
authorRoute.patch("/:id/avatar", Cloudinary, async (req, res, next) => {
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