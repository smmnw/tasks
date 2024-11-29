import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {View} from "react-native";

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
    const [supabaseClient, setSupabaseClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeClient() {
            try {
                const KEY = await SecureStore.getItemAsync("KEY");
                const URL = await SecureStore.getItemAsync("URL");

                if (KEY && URL) {
                    const client = createClient(URL, KEY, {
                        auth: {
                            persistSession: true,
                            autoRefreshToken: true,
                            storage: AsyncStorage,
                        },
                    });
                    setSupabaseClient(client);
                } else {
                    console.error("Missing Supabase credentials.");
                }
            } catch (error) {
                console.error("Error initializing Supabase client:", error);
            } finally {
                setLoading(false);
            }
        }

        initializeClient();
    }, []);

    if (loading) {
        return  <View></View>
    }

    return (
        <SupabaseContext.Provider value={supabaseClient}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => useContext(SupabaseContext);