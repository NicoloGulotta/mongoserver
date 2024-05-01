import { Router } from "express";
import Author from "../models/modelAuthor.js";
import Blog from "../models/modelBlog.js";
import bcrypt from "bcrypt";
import Cloudinary from "../middelware/multer.js";
import { authMiddleware, generateJWT } from "../middelware/auth.js";
export const routeAuthor = Router();

routeAuthor.get("/", async (req, res, next) => {
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
    if (!body || !body.email || !body.password) {
        return res.status(400).send("Invalid request body");
    }
    try {
        let foundUser = await Author.findOne({
            email: body.email,
        })
        if (foundUser) {
            const matching = await bcrypt.compare(body.password, foundUser.password)            if (matching) {
                const token = await generateJWT({
                    name: foundUser.name,
                    email: foundUser.email,
                })

                res.send({ user: foundUser, token })
            } else res.status(400).send("Wrong password")
        } else res.status(400).send("User does not exist.")
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
        // Validate user data (optional, can be added here)
        const { name, email, password } = req.body;

        // Basic email validation (example)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format');
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user using your database model
        const author = await Author.create({
            name,
            email,
            password: hashedPassword,
            // ... other user properties (if applicable)
        });

        // Handle successful registration
        res.send(author); // Or a success message

    } catch (error) {
        console.error(error.message); // Log the error for debugging
        res.status(400).send({ error: error.message || 'Registration failed' }); // Send appropriate error response
    }
});

export default routeAuthor;