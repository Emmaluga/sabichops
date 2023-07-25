require("dotenv").config()
const mongoose = require("mongoose")


const connectDB = (url)=> {
  
 return mongoose.connect(url)
}

// const connectDB = async ()=> {
//        await mongoose.connect(process.env.MONGOCONNECT)
// }

module.exports = connectDB