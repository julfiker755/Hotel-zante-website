import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";


const axiosinstance = axios.create({
    baseURL:import.meta.env.VITE_server_side_api_call,
    withCredentials:true,
  
  });
  

const useSeureIncaptor = () => {
    const { logOut,user } =useAuth()
    const navigate=useNavigate()
  
    useEffect(() => {
        axiosinstance.interceptors.request.use(function (config) {
          return config;
        }, function (error) {
          return Promise.reject(error);
        });
        //   response incaptor
        axiosinstance.interceptors.response.use(function (response) {
          return response;
        }, async function (error) {
          if(error.response.status === 401 || error.response.status === 403){
            await logOut()
            navigate('/')
          }
          return Promise.reject(error);
        });
      }, [])
  
  
    return axiosinstance
};

export default useSeureIncaptor;