const { default: mongoose } = require("mongoose")
const Bookingsmodel = require("../models/BookingModel")
const Roomsmodel = require("../models/RoomModel")



// bookings create data 
exports.bookings=async(req,res)=>{
    try{
        const bodydata=req.body
        const result=await Bookingsmodel.create(bodydata)
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}

// room datbase use ---rooom ? 'booked: 'cencel' 
exports.roombookings=async(req,res)=>{
    try{
        const {id}=req.params
        const bodydata=req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid ID format Id not match' });
        }
        
        const query = { _id: id };
        const updateData = { $set: { room:bodydata.room}};
        const options = { upsert: true };

        const result=await Roomsmodel.updateOne(query,updateData,options)
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}

// booking gust data get email base
exports.bookingsguest=async(req,res)=>{
    try{
        const bodyemail=req.params.gustemail
        const result=await Bookingsmodel.find({'guest.email':bodyemail})
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}
// booking bookingshost data get email base
exports.bookingshost=async(req,res)=>{
    try{
        const bodyemail=req.params.hostemail
        const result=await Bookingsmodel.find({host:bodyemail})
        res.status(200).json({status:'success',data:result})

    }catch(err){
        res.status(200).json({status:"fail",data:err.toString()})
    }
}