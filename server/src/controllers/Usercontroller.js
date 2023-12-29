const Usersmodel = require("../models/UserModel")

exports.users=async(req,res)=>{
    try{
        const email = req.params.email
        const user = req.body
        const options = { upsert: true }
        const query = { email: email }
        const result = await Usersmodel.updateOne(
          query,
          {
            $set: {
              email:user?.email,
              name:user?.name,
              role:user?.role,
              status:user?.status,
            },
          },
          options
        )
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}

// get user eamil base 
exports.getuserasync=async(req,res)=>{
  try{
      const email = req.params.email
      const query = { email: email }
      const result = await Usersmodel.find(query)
      res.status(200).json({status:'success',data:result})

  }catch(err){
      res.status(200).json({status:"fail",data:err.toString()})
  }
}

// get user eamil base 
exports.getuseradmin=async(req,res)=>{
  try{
      const result = await Usersmodel.find()
      res.status(200).json({status:'success',data:result})

  }catch(err){
      res.status(200).json({status:"fail",data:err.toString()})
  }
}