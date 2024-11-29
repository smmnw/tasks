import { useContext, useEffect, useState, createContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchSession } from "./user/useFetchSession";
import { useSupabase } from "./SupabaseContext";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true); // Start as loading
    const queryClient = useQueryClient();
    const { data: user, refetch } = useFetchSession();
    const supabase = useSupabase();

    useEffect(() => {
        let authListener; // To clean up subscription

        const initializeAuth = async () => {
            try {
                setLoading(true);
                await refetch(); // Fetch initial session
            } catch (error) {
                console.error("Error fetching session:", error);
            } finally {
                setLoading(false);
            }

            if (supabase) {
                // Listen for auth state changes
                authListener = supabase.auth.onAuthStateChange((_event, session) => {
                    queryClient.setQueriesData(["authUser"], session?.user || null);
                });
            }
        };

        initializeAuth();

        // Cleanup on unmount
        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, [queryClient, refetch, supabase]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};