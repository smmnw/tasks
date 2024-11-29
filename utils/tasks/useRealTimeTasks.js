import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSupabase } from "../SupabaseContext";

export const useRealTimeTasks = () => {
    const queryClient = useQueryClient();
    const supabase = useSupabase();

    useEffect(() => {
        if (!supabase) {
            console.warn("Supabase client not ready.");
            return;
        }

        const channel = supabase
            .channel("realtime:tasks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "tasks" },
                () => {
                    queryClient.invalidateQueries(["tasks"]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, queryClient]); // Include all dependencies
};