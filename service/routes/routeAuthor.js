import { Router } from "express";
import Author from "../models/modelAuthor.js";

export const authorApi = Router();

authorApi.get("/", async (req, res, next) => {
    try {
        let authors = await Author.find()
        res.send(authors)
    } catch (error) {
        next(error)
    }
});

authorApi.get("/:id", async (req, res, next) => {
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

authorApi.post("/", async (req, res, next) => {
    try {
        let author = await Author.create(req.body);
        res.status(201).send(author);
    } catch (err) {
        next(err);
    }
});

authorApi.put("/:id", async (req, res, next) => {
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

authorApi.delete("/:id", async (req, res, next) => {
    try {
        await Author.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default authorApi;