import {useQuery} from "@tanstack/react-query";
import { useSupabase} from "../SupabaseContext";

const fetchTasks = async (Supabase) => {
    const {data, error} = await Supabase.from('tasks').select('*')
    if(error ) throw new Error(error.message)
    return data
}

const useFetchTasks = () => {
    const Supabase = useSupabase();
    return useQuery({
        queryKey: ['tasks'],
        queryFn:()=> fetchTasks(Supabase),

    })
}
export default useFetchTasks;