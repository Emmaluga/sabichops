require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connect")
const contactRoute = require("./Route/contactRoute")
const cors = require("cors")
const errHandler = require("./middleware/errMiddleware")
const userRoute = require("./Route/userRoute")
const Products = require("./data/productData")
const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({origin: true, credentials: true}))
app.use(errHandler)

//routes
app.get("/products", (req,res)=> {
    res.json(Products)
})

app.use("/", userRoute)
app.use("/contact", contactRoute)


PORT = process.env.PORT || 8000

const start = async () => {
    
    try {
        
        await connectDB(process.env.MONGOCONNECT)
        console.log("connected to DB")
        app.listen(PORT,()=> console.log(`server running on port ${PORT}`))
        
        } catch (error) {
            console.error("failed to connected to DB") 
        }
    }

 start()