const express =require('express');
const mongoose =require('mongoose');
const router =require('./src/routes/api');
const app= new express();
const cors =require('cors');



// Security Middleware Implement
app.use(cors({
origin: ['http://localhost:5173', 'https://hotel-zante.surge.sh'],
credentials: true,
optionSuccessStatus: 200,}
))
app.use(express.json())




// Mongo DB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.3ksqccu.mongodb.net/Vista";
let OPTION={user:'julfiker',pass:'CPpZyXtI8CbDyiLI',autoIndex:true}
mongoose.connect(URI,OPTION)
.then(() => {
    console.log('Mongoose connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.toString());
  });


// Routing Implement
app.use("/",router)


// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Routes"})
})


module.exports=app;
















