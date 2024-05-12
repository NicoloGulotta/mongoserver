import {Schema, model} from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        dataDiNascita: {
            type: String,
            required:true
        },
        avatar: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },

    {
        collection: "authors",
        timestamps: true
    }
);

export default model("User", userSchema);