const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
         user: { type: mongoose.Schema.Types.ObjectId,  
         ref: "User"
         },
         text: { type:String, required:true, minlength: 5, maxlength: 255 },
         rating: { type:Number, required:true, minlength: 1, maxlength: 10 },
         date_uploaded: {  type: Date, required:true, default:Date.now}
})

const Feedback = mongoose.model("Feedback", feedbackSchema)

module.exports = Feedback;
//or
// MVR
//module.exports.Feedback = Feedback;