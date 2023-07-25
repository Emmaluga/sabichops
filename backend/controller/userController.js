const asyncHandler = require("express-async-handler")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const registerContrl = asyncHandler ( async (req,res)=> {

  const {fullname,email,password} = req.body

      const userExist = await userModel.findOne({email})
        if(userExist){
        res.status(500)
          throw new Error("Email aready exist")
        }

        const saltrounds = 10
        const gensalt = await bcrypt.genSalt(saltrounds)
        const hashPass = await bcrypt.hash(password, gensalt)
        
        const user = await userModel.create({

            fullname,
            email,
            password: hashPass,
      

        })

        res.json({
            
            _id: user.id,
            fullname:user.fullname,
            email: user.email,
            token: genUserToken(user._id)
            
        })

        if(!user){
         res.status(500)
         throw new Error("Invalidate user.")
        }
})

const loginContrl = asyncHandler ( async (req,res)=> {

    const {email, password } = req.body
   
     const loginuser = await userModel.findOne({email})

     if(!loginuser){
        res.status(500)
        throw new Error("Email does not exist")

       }
         

        if(loginuser && await bcrypt.compare(password, loginuser.password)){
            res.json({
                  
                 _id: loginuser.id,
                 fullname: loginuser.fullname,
                 email: loginuser.email,
                 token: genUserToken(loginuser._id)
            })
        }
         
})

const getmeContrl = asyncHandler ( async (req, res)=> {

const { _id, fullname, email } =  await userModel.findById( req.UserToken.id)
 
res.json({

    id: _id,
    fullname: fullname,
    email: email
})

})


const genUserToken = (id)=> {
  return jwt.sign({id}, process.env.SECRETKEY, {expiresIn: "30days"})
}

module.exports =  {

 registerContrl,
 loginContrl,
 getmeContrl 

}