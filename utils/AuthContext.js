import {useContext, useEffect, useState, createContext} from 'react'
import {useQueryClient} from "@tanstack/react-query";
import {useFetchSession} from "./user/useFetchSession";
import {Supabase} from "./Supabase";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const {data: user, refetch} = useFetchSession()

    useEffect(() => {
        const getSession = async() => {
            setLoading(true);
            await refetch()
            setLoading(false);
        }
        getSession()
        const {data: authListener} = Supabase.auth.onAuthStateChange((_event, session) => {
            queryClient.setQueriesData(['authUser'], session?.user || null)
        })
        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [queryClient, refetch]);

    return (<AuthContext.Provider value={{user, loading}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}