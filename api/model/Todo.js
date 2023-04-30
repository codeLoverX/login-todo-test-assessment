const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    },
    userID: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true, 'Todo must be associated with a user']
    }
},
{
    timestamps: { createdAt: 'created', updatedAt: 'modified' }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo
