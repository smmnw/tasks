import {Alert, StatusBar, View} from "react-native";
import {Button, TextInput, Text, useTheme} from "react-native-paper";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { useSignIn} from '../utils/user/useSignIn'
export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const {mutate,error}  =useSignIn()
    const {colors} =useTheme()
      const loginHandler=()=>{
        mutate({email, password})
      }


    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {error && Alert.alert("Error",new Error(error).message)}
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" testID='email'style={{marginTop:10,marginHorizontal:8}}/>
            <TextInput value={password} onChangeText={setPassword} placeholder="Password" testID='password'style={{marginTop:4,marginHorizontal:8}}/>
        </View>

        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <Button onPress={() => {
                navigation.navigate('Signup')
            }}>Signup</Button>
            <Button mode='elevated' onPress={
               loginHandler
            }>Login</Button>
        </View>


    </View>)
}