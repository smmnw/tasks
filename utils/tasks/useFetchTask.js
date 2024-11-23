import {useQuery} from "@tanstack/react-query";
import {Supabase} from "../Supabase";

const fetchTask = async (id) => {
    const {data,error} =await Supabase.from('tasks').select('*').eq('id', id)
    if(error) throw new Error(error.message)
    return data
}

const useFetchTask = (id) => {
    return useQuery({
        queryKey:['task',id],
        queryFn: (id) => fetchTask(id)
    })
}

export default useFetchTask;