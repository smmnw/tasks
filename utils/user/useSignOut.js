import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const signOut=async ()=>{
    const [data,error]=await Supabase.auth.signOut()
    if(error)throw new Error(error.message);
}

export const useSignOut=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:()=>signOut(),
        onsuccess:()=>{
            queryClient.invalidateQueries(['authUser'])
        }
    })
}