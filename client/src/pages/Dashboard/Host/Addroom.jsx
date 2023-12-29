import React, { useState } from 'react';
import AddRoomForm from '../../../components/From/AddRoomForm';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useSeureIncaptor from '../../../hooks/useSeureIncaptor';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddRoom = () => {
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
      const navigate=useNavigate()
      const SeureIncaptor=useSeureIncaptor()
      const [loading,setloading]=useState(false)
      const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
      const {user}=useAuth()
       // img api 
      const imgapi=import.meta.env.VITE_imgbb_api_key

    const  handleSubmit=async(e)=>{
       e.preventDefault()
       setloading(true)
       const form = e.target
       const location = form.location.value
       const category = form.category.value
       const title = form.title.value
       const to = dates.endDate
       const from = dates.startDate
       const price = form.price.value
       const guests = form.total_guest.value
       const bathrooms = form.bathrooms.value
       const description = form.description.value
       const bedrooms = form.bedrooms.value
       const image = form.image.files[0]
       const formData = new FormData()
       formData.append('image', image)
    //    img post data
    axios.post(`https://api.imgbb.com/1/upload?key=${imgapi}`,formData)
    .then(async(result)=>{
     const imguser=result?.data?.data?.display_url
     const roomdata={location,category,title,to,from,price,guests,bathrooms,description,bedrooms,image:imguser,host:{
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      }}
    
    //    save data from mongobd
     try{
        const {data}=await SeureIncaptor.post('/room_add',roomdata)
        if(data.status ==="success"){
          setloading(false)
          toast.success('Room add Successfull')
          navigate('/dashboard/my-listing')
          
        }
        if(data.status === "fail"){
            toast.error('Room add not Added')
            setloading(false)
        }
     }catch(err){
        toast.error('Server Error')
     }
      

    })
    
    // setloading(false)
    }
    // handledates
    const handleDates=ranges=>{
        setDates(ranges.selection)
    }
   // Handle Image button text
    const handleImageChange = image => {
        setUploadButtonText(image.name)
      }


    return (
        <div>
            <AddRoomForm uploadButtonText={uploadButtonText} handleImageChange={handleImageChange} loading={loading} handleSubmit={handleSubmit} handleDates={handleDates} dates={dates}></AddRoomForm>
        </div>
    );
};

export default AddRoom;