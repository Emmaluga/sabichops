const mongoose = require("mongoose")
const contactModel = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },


    message:{
        type: String,
        required: true
    } 
},{
   timestamps: true 
})

module.exports = mongoose.model("Contact", contactModel)