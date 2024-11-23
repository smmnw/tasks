import {View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useL, useSignIn} from '../utils/user/useSignIn'
export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const {mutate}  =useSignIn()

      const loginHandler=()=>{
        mutate({email, password})
      }

    return (
        <View style={{flex: 1}}>
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" testID='email'/>
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" testID='password'/>
        </View>

        <View >
            <Button onPress={() => {
                navigation.navigate('Signup')
            }}>Signup</Button>
            <Button mode='outlined' onPress={
               loginHandler
            }>Login</Button>
        </View>


    </View>)
}