import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSupabase} from "../SupabaseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signOut=async (Supabase)=>{
    const [data,error]=await Supabase.auth.signOut()
    if(error)throw new Error(error.message);
    await AsyncStorage.clear()
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