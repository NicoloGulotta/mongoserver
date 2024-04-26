import { Schema, model } from "mongoose"

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: { type: Schema.Types.ObjectId, ref: "Authors", required: true }
    },
    { collection: "comments" }
)
export default model("Comment", commentSchema)