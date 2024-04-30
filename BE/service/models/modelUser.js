import { model, schema } from 'mongoose';

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: "user" });

export default model("User", userSchema);