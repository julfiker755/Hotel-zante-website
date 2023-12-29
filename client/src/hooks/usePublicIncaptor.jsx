import axios from "axios";


const axiosinstance = axios.create({
  baseURL:import.meta.env.VITE_server_side_api_call,
  withCredentials:true,
});

const usePublicIncaptor= () => {
  return axiosinstance
};



export default usePublicIncaptor;