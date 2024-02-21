const express = require('express');
const _ = require("lodash")
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../validators")

router.get("/profile",  async (req,res) =>{
      const profile =  await User.findById(req.user._id)
      if(!profile){
              return res.status(404).send("The User you are trying to reach is not available ")
      }
      res.send(profile)
});


router.post("", async (req, res)=> {
       const {error, value} = validateUser(req.body)
       if (error) return res.status(400).send(error.details[0].message)

       let user = await User.findOne({ email: req.body.email})
       if (user) return res.status(400).send("Invalid") 
       
       let name = await User.findOne({ name: req.body.name})
       if (name) return res.status(400).send("Invalid") 

       user =  new User( _.pick(req.body, ["name", "email", "password", "isAdmin"]));

       const salt =  await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password, salt)

       await user.save()  
       const token = user.generateAuthToken();
       res.header("x-auth-token",token).send(_.pick(user, ["_id","name","email", "isAdmin"]));
       // res.send( _.pick(user, ["_id","name", "email"]));
 });

 module.exports = router;
 