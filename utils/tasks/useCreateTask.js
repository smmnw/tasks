import  {useMutation,useQueryClient} from  '@tanstack/react-query'
import {Supabase} from "../Supabase";

const createTask=async (task)=>{
    console.log(task)
    const {data,error} =await Supabase.from('tasks').insert([task]);
    if(error) throw new Error(error.message);
    return data
}

 const useCreateTask = ()=>{
    const queryClient=useQueryClient()
       return useMutation({
           mutationFn:(task)=>createTask(task),
           onSuccess:()=>{
               queryClient.invalidateQueries(['tasks'])
           }
       })
}

export default useCreateTask;