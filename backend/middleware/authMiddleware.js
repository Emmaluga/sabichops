
require("dotenv").config()
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")



const authMiddleware = asyncHandler ( async (req,res,next)=> {

       let token;
    //check for auth in headers with bearer
      
     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

     

         try {
              //split and assign bearer to a token
             token = req.headers.authorization.split(" ")[1]

            //verify token and secretkey
            const decoded = jwt.verify(token,process.env.SECRETKEY)

            // create a special req property and assign payload 

            req.UserToken = await userModel.findById(decoded.id).select("-password")

            next()

         } catch (error) {
            console.log(error)
            res.status(406)
            throw new Error("No authorization")
         }

          if(!token){
            res.status(406)
            throw new Error("No token no authorization")

          }
         
     }
    else{
        res.status(406)
        throw new Error("No bearers in authorization")

    }
})


module.exports = authMiddleware