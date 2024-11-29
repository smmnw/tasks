import {useQuery} from "@tanstack/react-query";
import { useSupabase} from "../SupabaseContext";

const fetchTask = async (id,Supabase) => {
    const {data,error} =await Supabase.from('tasks').select('*').eq('id', id)
    if(error) throw new Error(error.message)
    return data
}

const useFetchTask = (id) => {
    const Supabase = useSupabase(id)
    return useQuery({
        queryKey:['task',id],
        queryFn: (id) => fetchTask(id,Supabase),
    })
}

export default useFetchTask;