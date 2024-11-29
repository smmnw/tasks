import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useSupabase} from "../SupabaseContext";

const updateTask=async (id, name, completed,Supabase)=>{

    const {data,error} =await Supabase.from('tasks').update({completed:completed,name:name}).eq('id',id)
    if(error) throw new Error(error.message)
       return  data
 }

 export const useUpdateTask=()=>{
    const queryClient=useQueryClient()
     const Supabase=useSupabase()
    return useMutation({
        mutationFn:({id, name, completed})=>updateTask(id,name,completed,Supabase),
        onSuccess:()=>{
            queryClient.invalidateQueries(['tasks'])
        }
    })
 }