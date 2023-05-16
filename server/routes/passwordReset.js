const express = require('express');
const router = express.Router()
const crypto = require('crypto');
const Joi = require('joi');
const sendEmail = require('../util/sendEmail');
const bcrypt = require("bcrypt");


const userModel = require('../model/users');
const tokenModel = require('../model/token');

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await userModel.findOne({ email: req.body.email });
        console.log(user);
        if (!user) return res.status(400).send("user does not exist");

        let token = await tokenModel.findOne({ userID: user._id });
        if (!token) {
            console.log('ok');
            token = await new tokenModel({
                userID: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();

            const link = `${process.env.CORS_ORIGIN}/reset-password/${user._id}/${token.token}`;
            await sendEmail(user.email, "password reset", link);

            res.send("password reset has been sent successfully");
        } else {
            console.log("already sent");
            res.send("link already sent")
        }
    } catch (error) {
        res.send("Error Occured");
        console.log(error);
    }
})

router.post("/:userID/:token", async (req, res) => {
    try {
        console.log(req.body);
        const schema = Joi.object(
            {
                password: Joi.string().required(),
                userID: Joi.string().required(),
                token: Joi.string().required(),
            });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ errorMessage: error.details[0].message });

        const user = await userModel.findById(req.body.userID);
        if (!user) return res.status(400).json({ errorMessage: "Invalid link or expired" });

        const token = await tokenModel.findOne(
            {
                userID: user._id,
                token: req.body.token
            }
        );
        if (!token) return res.status(400).json({ errorMessage: "Invalid link or expired" });

        user.password = bcrypt.hashSync(req.body.password, 10);
        await user.save();
        await token.deleteOne();

        res.json({ success: "password reset successfully" })
    } catch (error) {
        res.send("error occured")
        console.log(error);
    }
})

module.exports = router;