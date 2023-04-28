import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can't be invalid."],
    },
    description: {
        type: String,
        required: [true, "Please eneter a description for your todo."],
    },
    done: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Posts", PostSchema);