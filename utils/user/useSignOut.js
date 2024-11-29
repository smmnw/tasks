import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSupabase} from "../SupabaseContext";

const signOut=async (Supabase)=>{
    const [data,error]=await Supabase.auth.signOut()
    if(error)throw new Error(error.message);
}

export const useSignOut=()=>{
    const queryClient=useQueryClient()
    const Supabase=useSupabase()
    return useMutation({
        mutationFn:()=>signOut(Supabase),
        onSuccess:()=>{
            queryClient.invalidateQueries(['authUser'])
        }
    })
}