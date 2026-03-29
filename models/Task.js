import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    text: String,
    day: String,
    time: String,
    category: String,
    completed: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Task =mongoose.model("Task", taskSchema)

export default Task