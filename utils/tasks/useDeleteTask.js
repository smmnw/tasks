import {useMutation,useQueryClient} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const deleteTask = async (taskId) => {
    return Supabase.from('tasks').delete().eq("id", taskId)
    if(error) throw new Error(error.message)
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (taskId) => deleteTask(taskId),
        onSuccess:()=>{
         queryClient.invalidateQueries(['tasks'])
        }
    })
}