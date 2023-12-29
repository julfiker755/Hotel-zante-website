const express =require('express');
const RoomController = require('../controllers/RoomController');
const Usercontroller=require("../controllers/Usercontroller")
const Tokencontroller=require("../controllers/Tokencontroller");
const StripeController = require('../controllers/StripeController');
const BookingController = require('../controllers/BookingController');
const router =express.Router();



// room 
router.get("/rooms",RoomController.rooms);
router.get("/rooms/:id",RoomController.signleroom);
// Dashboared
router.post("/room_add",RoomController.roomadd)
router.get("/host_all_room/:email",RoomController.hostallroom)
// user
router.put('/users/:email',Usercontroller.users)
router.get('/getuser/:email',Usercontroller.getuserasync)
router.get('/alluser',Usercontroller.getuseradmin)


// token
router.post('/token_create',Tokencontroller.tokenaccess)
router.get('/token_remove',Tokencontroller.removetoken)

// stripe payment system
router.post('/create-payment-intent',StripeController.stripepayment)
// booking 
router.post('/bookings',BookingController.bookings)
router.put('/booking_control/:id',BookingController.roombookings)
router.get('/gustdata/:gustemail',BookingController.bookingsguest)
router.get('/hostdata/:hostemail',BookingController.bookingshost)




module.exports=router;






































module.exports=router;