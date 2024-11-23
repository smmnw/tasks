import {Supabase} from '../Supabase'
import {useMutation, useQueryClient} from "@tanstack/react-query";
const signIn =async ({email, password})=>{
  const {data,error} = await Supabase.auth.signInWithPassword({email,password})
    if(error) throw new Error(error.message)
    return data
}

export  const useSignIn=()=>{
    const queryClient=  useQueryClient()
    return useMutation({
        mutationFn: signIn,
        onSuccess:()=>{
            queryClient.invalidateQueries(['authUser'])
        }
    })
}