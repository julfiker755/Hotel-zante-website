const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
   location:{ type: String, required: true },
   title: { type: String, required: true },
   from: { type: String, required: true },
   to: { type: String, required: true },
   price: { type: Number, required: true },
   guests: { type: String, required: true },
   bathrooms: { type: String, required: true },
   bedrooms: { type: String, required: true },
   description: { type: String, required: true },
   image: { type: String, required: true },
   host:{
     name:{ type: String, required: true },
     image:{type:String,required:true},
     email:{type:String,required:true}
   },
   category: { type: String, required: true },
   room:{ type: String},
  });
  
  
  
  const Roomsmodel = model('Rooms', roomSchema);

  module.exports= Roomsmodel;
  
