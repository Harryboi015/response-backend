const Joi = require("joi");

const validate = (schema) => (payload) => schema.validate(payload);


const feedbackSchema = Joi.object({
      user: Joi.string(),
      text: Joi.string().min(3).max(255).required(),
      rating: Joi.number().required().min(1).max(10),
      date:  Joi.date()

});

const userSchema = Joi.object({
      name: Joi.string().required().min(3).max(100),
      email: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(4).max(50),
      isAdmin: Joi.boolean()
}) 

const authSchema = Joi.object({
      email: Joi.string().required().min(4).max(34).email(),
      // userId: Joi.string().required().min(3).max(5),
      password: Joi.string().required().min(3).max(20)
})

module.exports.validateUser = validate(userSchema);
module.exports.validateFeedback = validate(feedbackSchema);
module.exports.validateAuth = validate(authSchema);

