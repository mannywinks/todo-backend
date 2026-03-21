import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    text: String,
    day: String,
    time: String,
    category: String,
    completed: Boolean,
})

export default mongoose.model("Task", taskSchema);