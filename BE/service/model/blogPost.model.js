import {Schema, model} from 'mongoose';

const blogPostSchema = new Schema(
    {
        category: {
            type: String,
            required:true
        },
        title: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: false
        },
        readTime: {
            value: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        collection: "Post",
        timestamps: true
    }
);

export default model("Post", blogPostSchema);