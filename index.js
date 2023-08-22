const express = require('express')
require("dotenv").config()
const cors = require("cors")
const { userRouter } = require('./routes/UserRoutes')
const { auth } = require('./middleware/auth')
const { connection } = require('./config/db')
const { taskRouter } = require('./routes/TaskRouter')


const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Home Page")
})


app.use("/users", userRouter)
app.use(auth)
app.use("/task", taskRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log("cannot connect")
        console.log(error)
    }
    console.log(`server is running at ${process.env.port}`)
})