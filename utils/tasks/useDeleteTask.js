import {useMutation,useQueryClient} from "@tanstack/react-query";
import {useSupabase} from "../SupabaseContext";

const deleteTask = async (taskId,Supabase) => {
    return Supabase.from('tasks').delete().eq("id", taskId)
    if(error) throw new Error(error.message)
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    const Supabase = useSupabase()
    return useMutation({
        mutationFn: (taskId) => deleteTask(taskId,Supabase),
        onSuccess:()=>{
         queryClient.invalidateQueries(['tasks'])
        }
    })
}