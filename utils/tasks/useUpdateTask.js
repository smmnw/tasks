import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const updateTask=async ({id, name, completed})=>{

    const {data,error} =await Supabase.from('tasks').update({completed:completed,name:name}).eq('id',id)
    if(error) throw new Error(error.message)
       return  data
 }

 export const useUpdateTask=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(id,name,completed)=>updateTask(id,name,completed),
        onSuccess:()=>{
            queryClient.invalidateQueries(['tasks'])
        }
    })
 }