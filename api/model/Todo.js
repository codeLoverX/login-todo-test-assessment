const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
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
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo
