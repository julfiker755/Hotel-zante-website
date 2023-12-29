import useAuth from "./useAuth";
import useSeureIncaptor from "./useSeureIncaptor";
import { useQuery } from "@tanstack/react-query";

const useGuest = () => {
    const {user}=useAuth()
    const secureIncaptor=useSeureIncaptor()

    const {data:guestdata,refetch,isPending } = useQuery({
        queryKey: ['user',user?.email],
         queryFn: async () => {
         const {data}=await secureIncaptor.get(`/gustdata/${user?.email}`)
         return data?.data
        }
    })

   return {guestdata,refetch,isPending}
};



export default useGuest;