import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {Supabase} from "../Supabase";

export const useRealTimeTasks = () => {
    const queryClient = useQueryClient();
    useEffect(() => {
        const channel = Supabase
            .channel('realtime:tasks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
                queryClient.invalidateQueries(['tasks']);
            })
            .subscribe();

        return () => {
            Supabase.removeChannel(channel);
        };
    }, [queryClient]);
}