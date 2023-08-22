const express = require("express")
const taskRouter = express.Router()
const jwt = require("jsonwebtoken")
const { taskModel } = require("../model/TaskModel")

//Read--------------------------------------------------
taskRouter.get("/", async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "bruce")
    try {
        if (decoded) {
            const note = await taskModel.find({ "userID": decoded.userID })
            res.status(200).send(note)
        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


taskRouter.post("/add", async (req, res) => {
    try {
        const note = new taskModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "Note has been created" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

taskRouter.patch("/update/:noteID", async (req, res) => {
    const { noteID } = req.params
    const payload = req.body
    try {
        await taskModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "new user has been updated" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

taskRouter.delete("/delete/:noteID", async (req, res) => {
    const { noteID } = req.params
    try {
        await taskModel.findByIdAndDelete({ _id: noteID })
        res.status(200).send({ "msg": "Note has been deleted" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = {
    taskRouter
}