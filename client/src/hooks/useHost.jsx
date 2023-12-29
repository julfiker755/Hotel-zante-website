import useAuth from "./useAuth";
import useSeureIncaptor from "./useSeureIncaptor";
import { useQuery } from "@tanstack/react-query";

const useHost = () => {
    const {user}=useAuth()
    const secureIncaptor=useSeureIncaptor()

    const {data:hostdata,refetch,isPending } = useQuery({
        queryKey: ['user',user?.email],
         queryFn: async () => {
         const {data}=await secureIncaptor.get(`/hostdata/${user?.email}`)
         return data?.data
        }
    })

   return {hostdata,refetch,isPending}
};


export default useHost;
