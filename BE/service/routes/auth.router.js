import { Router } from "express";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { authMiddleware, generateJwt } from "../middleware/authorization.js";

export const authRouter = Router();

// Register
authRouter.post("/register", async (req, res, next) => {
    try {
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });

        const token = await generateJwt({
            _id: user._id
        });
        res.send({user, token});
    } catch (err) {
        next(err);
    }
});

// Login
authRouter.post("/login", async (req, res, next) => {
    try {
        let userFound = await User.findOne({
            username: req.body.username,
        }).select('+password');

        if(userFound) {
            const isPasswordMatching = await bcrypt.compare(req.body.password, userFound.password);

            if(isPasswordMatching) {
                // Genera il token
                const token = await generateJwt({
                    _id: userFound._id
                });

                res.send({user: userFound, token});
            } else {
                res.status(400).send("Password errata");
            }
        } else {
            res.status(400).send("Utente non trovato")
        }
    } catch (err) {
        next(err);
    }
})