require("dotenv").config()
const contactModel = require("../model/contactModel")
const asyncHandler = require("express-async-handler")




const contactContrl = asyncHandler ( async (req,res)=> {
    const {fullname, message} = req.body

    
    const contacts = await contactModel.create({

        fullname,
        message
    })
    
    if(!contacts){
      res.status(500)
      throw new Error("Cant send message")

    }else{

          
             res.json(contacts)
           }
})

module.exports = contactContrl



