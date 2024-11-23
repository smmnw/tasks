import {StatusBar} from 'expo-status-bar';

import {Button, PaperProvider, Text} from "react-native-paper";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import TasksScreen from "./screen/TasksScreen";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import {AuthContextProvider, useAuth} from './utils/AuthContext'
import {View} from "react-native";
import {useSignOut} from "./utils/user/useSignOut";

export default function App() {
    const queryClient = new QueryClient();
    return (<NavigationContainer>
        <QueryClientProvider client={queryClient}>
            <PaperProvider>
                <AuthContextProvider>
                    <StatusBar style="auto"/>
                    <AuthFlow/>
                </AuthContextProvider>
            </PaperProvider>
        </QueryClientProvider>
    </NavigationContainer>);
}

function AuthFlow() {
    const Stack = createStackNavigator();
    const {user, loading} = useAuth()
    const {mutate:signOut} =useSignOut()
    function logout(){
             signOut()
    }
    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>)
    }
    return (
        <Stack.Navigator>
            {user ?
                <Stack.Screen name="Tasks" component={TasksScreen} options={{headerRight:()=>(
                         <>
                             <Text>{user?.email}</Text>
                             <Button onPress={logout}>Logout</Button>
                         </>
                    )}} /> :
                (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Signup" component={SignupScreen}/>
                    </>
                )
            }

        </Stack.Navigator>)
}


