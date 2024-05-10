import { Router } from "express";
import Author from "../models/modelAuthor.js";
import Blog from "../models/modelBlog.js";
import bcrypt from "bcryptjs";
import Cloudinary from "../middelware/multer.js";
import { authMiddleware, generateJWT } from "../middelware/auth.js";
import { config } from "dotenv";
config();
export const routeAuthor = Router();

routeAuthor.get("/home", async (req, res, next) => {
    try {
        const page = req.query.page || 1

        let authors = await Author.find()
            .limit(20)
            .skip(20 * (page - 1))
        res.send(authors)
    } catch (error) {
        next(error)
    }
})
routeAuthor.post("/login", async ({ body }, res, next) => {
    try {
        let foundUser = await Author.findOne({ email: body.email })
        if (!foundUser) {
            return res.status(401).send("Invalid credentials");
        } else if (foundUser) {
            const matching = await bcrypt.compare(body.password, foundUser.password)
            if (matching) {
                const token = await generateJWT({
                    email: foundUser.email,
                })

                res.send({ Author: foundUser, token })
            } else res.status(400).send("Wrong password")
        }
    } catch (error) {
        next(error)
    }
})
routeAuthor.get("/me", authMiddleware, async (req, res, next) => {
    try {
        let author = await Author.findById(req.user.id)
        res.send(author)

    } catch (error) {
        next(error)
    }
})
routeAuthor.get("/:id", async (req, res, next) => {
    try {
        let author = await Author.findById(req.params.id)

        res.send(author)
    } catch (error) {
        next(error)
    }
})
routeAuthor.get("/:id/blogPosts", async (req, res, next) => {
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

routeAuthor.patch("/:id/avatar", Cloudinary, async (req, res, next) => {
    try {
        let author = await Author.findByIdAndUpdate(
            req.params.id,
            {
                avatar: req.file.path,
            },
            { new: true }
        )
        res.send(author)
    } catch (error) {
        next(error)
    }
})

routeAuthor.put("/:id", async (req, res, next) => {
    try {
        let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        res.send(author)
    } catch (error) {
        next(error)
    }
})

routeAuthor.delete("/:id", async (req, res, next) => {
    try {
        await Author.deleteOne({
            _id: req.params.id,
        })
        res.send(204)
    } catch (error) {
        next(error)
    }
})

routeAuthor.post("/registration", async (req, res, next) => {
    try {
        const { name, email, password, lastName, avatar, birthday } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);
        // const token = generateJWT({
        //     _id: author._id,
        // })
        const author = await Author.create({
            name,
            lastName,
            email,
            password: hashedPassword,
            birthday,
            avatar
        });
        res.send(author);

    } catch (error) {
        next(error)
        console.error(error.message);
        res.status(400).send({ error: error.message || 'Registration failed' }); // Send appropriate error response
    }
});

export default routeAuthor;