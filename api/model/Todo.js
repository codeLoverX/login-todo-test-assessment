const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please eneter a description for your title."],
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
    timestamps: { createdAt: 'created', updatedAt: 'modified' }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo
