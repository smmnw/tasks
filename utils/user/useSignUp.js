import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const signUp = async ({email, password}) => {
    const {user,error} = Supabase.auth.signUp({email:email, password:password})
     return user
}

export const useSignUp = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries(['authUser'])
        }
    })
}