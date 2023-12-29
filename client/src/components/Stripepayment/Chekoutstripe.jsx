import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './Chekoutstripe.css'
import { ImSpinner9 } from 'react-icons/im'
import useAuth from '../../hooks/useAuth'
import useSeureIncaptor from '../../hooks/useSeureIncaptor'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Chekoutstripe = ({ bookingInfo, closeModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const seureincaptor=useSeureIncaptor()
  const navigate=useNavigate()



  // Create Payment Intent
  useEffect(()=>{
    (()=>{
        seureincaptor.post('/create-payment-intent',{price:parseFloat(bookingInfo.price)})
   .then(res=>{
       setClientSecret(res.data.clientSecret)
   })
    })()
   },[bookingInfo])


  const handleSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('error', error)
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('payment method', paymentMethod)
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      })

    if (confirmError) {
      console.log(confirmError)
      setCardError(confirmError.message)
    }

    console.log('payment intent', paymentIntent)

    if (paymentIntent.status === 'succeeded') {
      // Update room status in db
      const paymentInfo = {
        ...bookingInfo,
        transactionId: paymentIntent.id,
        bookingid:bookingInfo.roomId,
      }
      console.log(paymentInfo)
      
       // ******************save payment information to the server and database more information********************
       try{
        seureincaptor.post('/bookings',paymentInfo)
       .then(res=>{
       if(res.data.status === "success"){
         navigate('/dashboard/my-bookings')
        //    room:booked 
           seureincaptor.put(`/booking_control/${bookingInfo.roomId}`,{room:'booked'})
           .then(res=>{})
       }
       toast.success(`Payment Successfull`)
      })

       }catch(err){
        toast.error("Payment not success")

       }finally{
        setProcessing(false)
       }
      
    }
  }

  return (
    <>
      <form className='my-2' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex mt-2 justify-around'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? (
              <ImSpinner9 className='m-auto animate-spin' size={24} />
            ) : (
              `Pay ${bookingInfo.price}$`
            )}
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}



export default Chekoutstripe;