import {Alert, StatusBar, View} from "react-native";
import {Button, TextInput, Text, useTheme} from "react-native-paper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useSignUp} from "../utils/user/useSignUp";

export default function SignupScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {mutate, isLoading, error} = useSignUp()
    const {colors} =useTheme()
    if (isLoading) {
        return <View><Text>Loading...</Text></View>
    }

    const handleSignUp = () => {
        mutate({email, password})

    }
    const navigation = useNavigation()
    return (<View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

        {error && Alert.alert("Error", new Error(error).message)}
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" testID='email' style={{marginTop:10,marginHorizontal:8}}/>
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" testID='password' style={{marginTop:4,marginHorizontal:8}}/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <Button onPress={() => {
                navigation.goBack()
            }}>Login</Button>
            <Button mode='elevated' onPress={handleSignUp}>Signup</Button>
        </View>

    </View>)
}