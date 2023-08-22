const express = require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { userModel } = require("../model/UserModel");




userRouter.get("/", async (req, res) => {
    const query = req.query
    try {
        const users = await userModel.find(query)
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash( /*myPlaintextPassword*/pass, /*saltRounds*/5, async (err, hash) => {
            const user = new userModel({ name, email, pass: hash })
            await user.save()
            res.status(200).send({ "msg": "SignUp Successful" })
        });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})



userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successful", "token": jwt.sign({ "userID": user._id }, 'bruce') })
                } else {
                    res.status(400).send({ "msg": "Login Failed" })
                }
            });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = {
    userRouter
}