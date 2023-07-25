require("dotenv").config()
const connectDB = require("./config/connect")
const Products = require("./data/productData")
const productModel = require("./model/productModel")

connectDB(process.env.MONGOCONNECT)




const Dataload = async ()=> {

      try {

        await productModel.deleteMany({})
        await productModel.insertMany(Products)
        console.log("products loaded to DB.")
        process.exit()

      } catch (error) {
        console.log("failed.")
        process.exit(1)
      }

}

Dataload()