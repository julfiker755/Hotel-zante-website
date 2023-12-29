import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSeureIncaptor from "./useSeureIncaptor";


const useRole = () => {
    const {user}=useAuth()
    const secureIncaptor=useSeureIncaptor()
    const {data:userole,refetch,isPending } = useQuery({
        queryKey: ['user'],
         queryFn: async () => {
         const {data}=await secureIncaptor.get(`/getuser/${user?.email}`)
         return data?.data
        }
    })
   return {userole,refetch,isPending}
};

export default useRole;