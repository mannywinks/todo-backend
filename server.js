import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import Task from './models/Task.js';

const app = express()


app.use(cors({
    origin: "*"
}))
app.use (express.json())

app.get("/", (req,res ) => {
    res.send('API is running...')
})

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDb Atlas Connected'))
.catch((err) => console.log(err))

// Define API endpoints
// Create a new task
app.post("/tasks", async (req,res) => {
    const newTask = new Task(req.body)
    await newTask.save()
    res.json(newTask)
})
// Get all tasks
app.get("/tasks",async (req,res) => {
    const tasks = await Task.find()
    res.json(tasks)
})
// Delete a task
app.delete("/tasks/:id", async (req,res ) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted permanently" })
})
// Update a task
app.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})