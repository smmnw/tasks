import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Supabase} from "../SupabaseContext";

const fetchSession =async ()=>{
    const {data,error} =await Supabase.auth.getSession()
    if(error)throw new Error(error.message)
    console.log(data)
    return data?.session?.user || null
}

export const useFetchSession = ()=>{
    return useQuery({
        queryKey:['authUser'],
        queryFn:fetchSession,
        staleTime:Infinity,
        cacheTime:Infinity,
        refetchOnWindowFocus:false,
        enabled:false,

    })
}