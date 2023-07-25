const express = require("express")
const { registerContrl, loginContrl, getmeContrl } = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware")
const {body, validationResult, } = require("express-validator")
const userRoute = express.Router()


userRoute.post("/register",

[
   body("fullname").isLength({min:1})
   .trim()
   .withMessage("complete fullname field"),

   body("email").isEmail().normalizeEmail()
   .withMessage("complete email field")
   .trim(),

   body("password")
  
   .isStrongPassword({
     minNumbers: 1,
     minLowercase: 1,
     minUppercase: 1,
     minSymbols: 1

    })
    .withMessage("password must contain at least one lowercase")
    .withMessage("password must contain at least one lowercase")
    .withMessage("password must contain at least one uppercase")
    .withMessage("password must contain at least one symbol")
    .withMessage("password must contain at least one number")

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

  } , 
    
registerContrl)

userRoute.post("/login", 

[
 
    body("email").isEmail().normalizeEmail()
    .withMessage("complete email field")
    .trim(),
 
    body("password")
   
    .isStrongPassword({
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1
 
     })
     .withMessage("password must contain at least one lowercase")
     .withMessage("password must contain at least one lowercase")
     .withMessage("password must contain at least one uppercase")
     .withMessage("password must contain at least one symbol")
     .withMessage("password must contain at least one number")
 
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
 
   } , 

loginContrl)
userRoute.get("/me",
authMiddleware, getmeContrl)
   


module.exports = userRoute 