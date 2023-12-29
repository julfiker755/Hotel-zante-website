const stripe = require("stripe")('sk_test_51OEngWDbR4bZMF6dlP4SB6Tnjg7jnlyTHpwofmbv8XgpFJvdNiMapSD3UyRV2s5sUGUMiBxPaYzPhVZ1JlDWQhm300b1RCxa1T');

// app.post('/bookings', verifyToken, async (req, res) => {
//     const booking = req.body
//     const result = await bookingsCollection.insertOne(booking)
//     // Send Email.....
//     if (result.insertedId) {
//       // To guest
//       sendEmail(booking.guest.email, {
//         subject: 'Booking Successful!',
//         message: `Room Ready, chole ashen vai, apnar Transaction Id: ${booking.transactionId}`,
//       })

//       // To Host
//       sendEmail(booking.host, {
//         subject: 'Your room got booked!',
//         message: `Room theke vago. ${booking.guest.name} ashtese.....`,
//       })
//     }
//     res.send(result)
//   })
  // Update room booking status
//   app.patch('/rooms/status/:id', async (req, res) => {
//     const id = req.params.id
//     const status = req.body.status
//     const query = { _id: new ObjectId(id) }
//     const updateDoc = {
//       $set: {
//         booked: status,
//       },
//     }
//     const result = await roomsCollection.updateOne(query, updateDoc)
//     res.send(result)
//   })


//   stripe payments
  exports.stripepayment=async (req, res) => {
    const { price } = req.body;
    const amount=parseInt(price*100)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  }
