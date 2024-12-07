import React from "react";
import { PaperProvider,IconButton,MD3LightTheme ,adaptNavigationTheme} from "react-native-paper";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import TasksScreen from "./screen/TasksScreen";
import {NavigationContainer, useNavigation,DefaultTheme,DarkTheme as DefaultDark} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import {AuthContextProvider, useAuth} from "./utils/AuthContext";
import {View, Image} from "react-native";
import {SupabaseProvider} from "./utils/SupabaseContext";
import dev from './assets/dev.png'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MenuScreen from "./screen/MenuScreen";
const queryClient = new QueryClient();
import merge from 'deepmerge'

const {LightTheme,DarkTheme} =adaptNavigationTheme(
    {
        reactNavigationDark:DefaultDark,
        reactNavigationLight:DefaultTheme
    }
)
const CombinedLight =merge(MD3LightTheme,LightTheme);

const LightModified = {
    ...CombinedLight,
    colors: {
        ...CombinedLight.colors,
        primary: '#4B0082', // Vivid Indigo
        accent: '#00BFFF',  // Electric Cyan
        background: '#F5F5F5', // Light Gray
        surface: '#FFFFFF', // White
        text: '#2C2C2C', // Charcoal Black
        error: '#FF7F50', // Warm Coral
        pop:'#32CD32'
    }
};

export default function App() {
    return (<NavigationContainer theme={LightModified}>
        <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={LightModified}>
                <SupabaseProvider>
                    <AuthContextProvider>
                        <AuthFlow/>
                    </AuthContextProvider>
                </SupabaseProvider>
            </PaperProvider>
        </QueryClientProvider>
        </GestureHandlerRootView>
    </NavigationContainer>);
}

function AuthFlow() {
    const Stack = createStackNavigator();
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source={dev} style={{width: 200, height: 200}}/>
            </View>
        );
    }

    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor:LightModified.colors.primary
            },
            headerTintColor:'white',

        }}
        >
        {user ? (
            <>
            <Stack.Screen
            name="Tasks"
            component={TasksScreen}
            options={{
                headerRight: () => <Header/>,
            }}
        />
          <Stack.Screen name='Menu'
          component={MenuScreen}
          />

            </>) : (<>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </>)}
    </Stack.Navigator>);
}

function Header({user, onLogout}) {
  const navigation=  useNavigation()
    return (<>
        {/*<Text>{user?.email}</Text>*/}
        {/*<Button onPress={onLogout}>Logout</Button>*/}
        <IconButton  icon='dots-vertical' size={24} iconColor="white" onPress={()=>{
            navigation.navigate('Menu');
        }}/>

    </>);
}