const express = require('express');
const router = express.Router();
const  Feedback  = require("../models/feedback");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin")
const { validateFeedback } = require('../validators')


router.get("", async (req,res) =>{
        const feedbacks =  await Feedback.find().sort({ rating:  1})
        res.send (feedbacks)
});
 
router.get("/:id",  async (req,res) =>{
        //  const feedback = feedbacks.find((f) => f.id === parseInt(req.params.id))
        const feedbacks =  await Feedback.findById(req.params.id)
        if(!feedbacks){
                return res.status(404).send("The Feedback you are trying to reach is not available ")
        }
        res.send(feedbacks)
});


 router.post("", auth, async (req, res)=> {
        const {error, value} = validateFeedback(req.body)
 
        if (error) {
                return res.status(400).send(error.details[0].message)
        }   
 
       
    
        const feedback =  new Feedback({
                user: req.user._id,
                rating : req.body.rating,
                text : req.body.text,
                
                
        });
        const feedbacks =  await feedback.save()
         res.send(feedbacks);
 });
 



 router.put("/:id",auth, async (req, res) => {
         const {error, value } = validateFeedback(req.body)
         if (error) {
                 return res.status(400).send(error.details[0].message)
         }
         const feedback = await Feedback.findByIdAndUpdate(req.params.id, {
             $set:{ 
                 rating : req.body.rating,
                 text : req.body.text,
             }
         }, { new: true})
         if (!feedback) {
                 return res.status(404).send("The FeedbackId you are trying to reach is not available.")
         }
         if (!feedback) {
                  return res.status(404).send("The FeedbackId you ")
         }
         res.send(feedback);
 });
 
 router.delete("/:id",  auth, async (req, res) => {
         // checking for Joi.existing feedback
         const feedback = await Feedback.findByIdAndDelete(req.params.id)
         if (!feedback) {
                 return res.status(404).send("The FeedbackId you are trying to reach is not available.")
         }
         res.send(feedback) 
 });




module.exports = router


// populate
