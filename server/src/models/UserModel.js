const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    name:{type:String,required:true},
    email:{ type: String},
    role:{type:String,required:true},
    status:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },
  
  });
  
  
  const Usersmodel = model('users', userSchema);

  module.exports= Usersmodel;
  
