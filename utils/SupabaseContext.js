import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";
import { useSavePrivate } from "./user/useSavePrivate";

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
    const [supabaseClient, setSupabaseClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeClient = async () => {
            try {
                // Save environment variables to secure storage
                await useSavePrivate();

                // Retrieve credentials from secure storage
                const KEY = await SecureStore.getItemAsync("KEY");
                const URL = await SecureStore.getItemAsync("URL");

                if (KEY && URL) {
                    // Initialize Supabase client
                    const client = createClient(URL, KEY, {
                        auth: {
                            persistSession: true,
                            autoRefreshToken: true,
                            storage: AsyncStorage,
                        },
                    });
                    setSupabaseClient(client);
                } else {
                    throw new Error("Missing Supabase credentials.");
                }
            } catch (error) {
                console.error("Error initializing Supabase client:", error.message);
            } finally {
                setLoading(false);
            }
        };

        initializeClient();
    }, []);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SupabaseContext.Provider value={supabaseClient}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error("useSupabase must be used within a SupabaseProvider.");
    }
    return context;
};