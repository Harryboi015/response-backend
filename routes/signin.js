const express = require('express');
const _ = require("lodash")
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcryptjs");
const {  validateAuth } = require("../validators")

router.post("", async (req, res)=> {
       const {error, value} = validateAuth(req.body)
       if (error) return res.status(400).send(error.details[0].message)

       let user = await User.findOne({ email: req.body.email})
       if (!user) return res.status(400).send("Invalid Email") 

       let validPassword = await bcrypt.compare(req.body.password, user.password)
       if (!validPassword) return res.status(400).send("Invalid Password")

       const token = user.generateAuthToken();
       res.status(200).json({..._.pick(user, ["_id","name","email"]), token});

       // res.header("x-auth-token", token).jsoon({..._.pick(user, ["_id","name","email"]),token});
       // await user.save()  
       // res.send( _.pick(user, ["_id","name", "email"]));
 });

 module.exports = router;
 