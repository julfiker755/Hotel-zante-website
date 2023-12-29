const { default: mongoose } = require("mongoose")
const Roomsmodel = require("../models/RoomModel")


// rooms find 
exports.rooms=async(req,res)=>{
    try{
        const result=await Roomsmodel.find({})
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}


// rooms add data --- mongoose use [create]/mongobd use [insertone]
exports.roomadd=async(req,res)=>{
    try{
        const bodydata=req.body
        const result=await Roomsmodel.create(bodydata)
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}


// room one find
exports.signleroom=async(req,res)=>{
    try{
        const { id } = req.params;
        // Check if the ID is in a valid ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid ID format Id not match' });
        }
        
        const query = { _id: id };
        const result = await Roomsmodel.findOne(query);
        res.status(200).json({ status: 'success', data: result });

    }catch(err){
        res.status(200).json({status:'fail',data:err.toString()})
    }
}


// host rooms data all access
exports.hostallroom=async(req,res)=>{
    try{
        const { email } = req.params;
        const query = {'host.email':email};
        const result = await Roomsmodel.find(query);
        res.status(200).json({ status: 'success', data: result });

    }catch(err){
        res.status(200).json({status:'fail',data:err.toString()})
    }
}