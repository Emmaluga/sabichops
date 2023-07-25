const express = require("express")
const contactContrl = require("../controller/contactContrller")
const { body , validationResult} = require("express-validator")
const contactRoute = express.Router()

contactRoute.post("/",
[

 body("fullname").isLength({min:3})
 .trim()
 .withMessage("complete fullname fields"),

 body("email").isEmail().normalizeEmail()
 .trim()
 .withMessage("complete email fields"),

],

(req,res,next)=> {
  const errors = validationResult(req)
   if(!errors.isEmpty()){
      res.json({
        success: false,
        message: errors.array()
      })
   }

   next()
},

 contactContrl)


module.exports = contactRoute