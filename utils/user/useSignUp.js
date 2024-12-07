import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSupabase} from "../SupabaseContext";

const signUp = async (email, password,Supabase) => {

    const {user,error} = await Supabase.auth.signUp({email:email, password:password})
      if(error) throw new Error(error.message);
     return user
}

export const useSignUp = () => {
    const queryClient = useQueryClient()
    const Supabase = useSupabase();
    return useMutation({
        mutationFn:({email, password})=> signUp(email,password,Supabase),
        onSuccess: () => {
            queryClient.invalidateQueries(['authUser'])
        }
    })
}