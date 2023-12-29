const { Schema, model } = require("mongoose");


const bookingSchema = new Schema({
   guest:{
     name:{ type: String, required: true },
     email:{type:String,required:true},
     image:{type:String,required:true},
   },
   host:{ type: String, required: true },
   location:{ type: String, required: true },
   price:{ type: String, required: true },
   to:{ type: String, required: true },
   from:{ type: String, required: true },
   title:{ type: String, required: true },
   image:{ type: String, required: true },
   transactionId:{ type: String, required: true },
   bookingid:{ type: String, required: true },
   date: { type: Date, default: Date.now },
  });
  
  
  
  const Bookingsmodel = model('Bookings', bookingSchema);

  module.exports= Bookingsmodel;
  