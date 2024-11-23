import {useQuery} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const fetchTasks = async () => {
    const {data, error} = await Supabase.from('tasks').select('*')
    if(error ) throw new Error(error.message)
    return data
}

const useFetchTasks = () => {
    return useQuery({
        queryKey: ['tasks'], queryFn: fetchTasks,
    })
}
export default useFetchTasks;