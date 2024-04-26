import { Schema, model } from "mongoose";

const authorSchema = new Schema(
    {
        // _id //generato da mongo
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true

        },
        birthday: {
            type: String,
            required: true

        },
        avatar: {
            type: String,
        }
    },

    { collection: "author" }
)

export default model("Author", authorSchema)