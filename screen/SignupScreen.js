import {View} from "react-native";
import {Button, TextInput, Text} from "react-native-paper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useSignUp} from "../utils/user/useSignUp";

export default function SignupScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {mutate, isLoading} = useSignUp()

    if (isLoading) {
        return <View><Text>Loading...</Text></View>
    }

    const handleSignUp = () => {
        mutate({email, password})

    }
    const navigation = useNavigation()
    return (<View style={{flex: 1}}>
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" testID='email'/>
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" testID='password'/>
        </View>
        <View>
            <Button onPress={() => {
                navigation.navigate('Login')
            }}>Login</Button>
            <Button mode='outlined' onPress={
                handleSignUp
            }>Signup</Button>
        </View>

    </View>)
}