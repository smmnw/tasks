import {useSupabase} from '../SupabaseContext'
import {useMutation, useQueryClient} from "@tanstack/react-query";
const signIn =async (email, password,Supabase)=>{
  const {data,error} = await Supabase.auth.signInWithPassword({email,password})
    console.log(data)
    if(error) throw new Error(error.message)
    return data
}

export  const useSignIn=()=>{
    const queryClient=  useQueryClient()
    const Supabase=useSupabase()
    return useMutation({
        mutationFn: ({email,password})=>signIn(email,password,Supabase),
        onSuccess:()=>{
            queryClient.invalidateQueries(['authUser'])
        }
    })
}