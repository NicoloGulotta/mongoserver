import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { authorRouter } from './services/routes/author.router.js';
import { blogPostRouter } from './services/routes/blogPost.router.js';
import { authRouter } from './services/routes/auth.router.js';

config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/authors", authorRouter);
app.use("/blogPosts", blogPostRouter);
app.use("/auth", authRouter);


const initServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        app.listen(process.env.PORT, () => {
            console.log(`Il server è collegato alla porta ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("forse qualcosa è andato storto")
    }
}

initServer();