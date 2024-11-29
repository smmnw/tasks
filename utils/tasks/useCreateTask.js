import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useSupabase} from "../SupabaseContext";

const createTask = async (task, Supabase) => {
    const {data, error} = await Supabase.from('tasks').insert([task]);
    if (error) throw new Error(error.message);
    return data
}

const useCreateTask = () => {
    const queryClient = useQueryClient()
    const Supabase = useSupabase()
    return useMutation({
        mutationFn: (task) => createTask(task, Supabase), onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
        }
    })
}

export default useCreateTask;