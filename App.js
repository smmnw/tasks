import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, PaperProvider, Text } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TasksScreen from "./screen/TasksScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import { AuthContextProvider, useAuth } from "./utils/AuthContext";
import { View } from "react-native";
import { useSignOut } from "./utils/user/useSignOut";
import { useSavePrivate } from "./utils/user/useSavePrivate";
import {SupabaseProvider} from "./utils/SupabaseContext";

// Initialize React Query client
const queryClient = new QueryClient();

export default function App() {
    // Fetch private data once on app load
    useEffect(() => {
        async function initializePrivateData() {
            try {
                await useSavePrivate(); // Call the function or method it represents
            } catch (error) {
                console.error("Error initializing private data:", error);
            }
        }
        initializePrivateData();
    }, []);

    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <PaperProvider>
                    <SupabaseProvider>
                    <AuthContextProvider>
                        <StatusBar style="auto" />
                        <AuthFlow />
                    </AuthContextProvider>
                    </SupabaseProvider>
                </PaperProvider>
            </QueryClientProvider>
        </NavigationContainer>
    );
}

function AuthFlow() {
    const Stack = createStackNavigator();
    const { user, loading } = useAuth();
    const { mutate: signOut } = useSignOut();

    const logout = () => {
        try {
            signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen
                    name="Tasks"
                    component={TasksScreen}
                    options={{
                        headerRight: () => <Header user={user} onLogout={logout} />,
                    }}
                />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}

function Header({ user, onLogout }) {
    return (
        <>
            <Text>{user?.email}</Text>
            <Button onPress={onLogout}>Logout</Button>
        </>
    );
}