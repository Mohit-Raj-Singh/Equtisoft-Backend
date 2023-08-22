const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: String,
    desc: String,
    check: Boolean,
    comment: String,
    projectList: String,
    label: String,
    userID: String
})

const taskModel = mongoose.model("note", taskSchema)

module.exports = {
    taskModel
}