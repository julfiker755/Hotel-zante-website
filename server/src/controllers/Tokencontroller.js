const jwt = require('jsonwebtoken')


// token create
exports.tokenaccess=async(req,res)=>{
   try{
    const user = req.body
    const token = jwt.sign(user, 'admin123', {
      expiresIn: '365d',
    })
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true})
   }catch(err){
    res.status(200).json({status:"fail",data:err.toString()})
   }
}

  // token remove
  exports.removetoken=async(req,res)=>{
    try{
        res.clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ status: true })
    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
  }
