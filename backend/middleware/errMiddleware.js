const errHandler = (err,req,res,next)=> {
   
      const statuscode = res.statuscode ? res.statuscode : 500 

           if(statuscode){
               res.status(500)
               res.json({
                message: err.message
               })
           }

           next()
    
}

module.exports = errHandler  