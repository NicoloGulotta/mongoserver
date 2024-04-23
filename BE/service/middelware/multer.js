import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; //as = cambio ome dipendenza
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from 'dotenv';
config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
export default multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "avatars",
        }
    })
}).single("avatar");