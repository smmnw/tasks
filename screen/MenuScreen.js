import  {View,Linking} from "react-native";
import {Button, List, useTheme} from 'react-native-paper'
import {useAuth} from "../utils/AuthContext";
import {useSignOut} from "../utils/user/useSignOut";
 const MenuScreen = () => {
   const {colors} =  useTheme()
     const {user, loading} = useAuth();
     const {mutate: signOut} = useSignOut();

     const logout = () => {
         try {
             signOut();
         } catch (error) {
             console.error("Error signing out:", error);
         }
     };

     return(
        <View>
            <List.Section>
                <List.Subheader>User</List.Subheader>
                <List.Item title={user?.email} left={() => <List.Icon icon="email" />} />
            </List.Section>
            <List.Section>
                <List.Subheader>Developer</List.Subheader>
                <List.Item title='saimgmg.nyanwin@smmnw.com' left={() => <List.Icon icon="email" />} onPress={()=>{
                    Linking.openURL("mailto:saimgmg.nyanwin@smmnw.com");
                }}/>
                <List.Item title='https://smmnw.com' left={() => <List.Icon icon="web" />} onPress={()=>{
                    Linking.openURL("https://smmnw.com");
                }}/>
            </List.Section>

            <List.Section>
                <List.Subheader>About App</List.Subheader>
                <List.Item title='This is todo app' left={() => <List.Icon icon="information" />}/>
                <List.Item title="Private Policy" left={() => <List.Icon icon="alert-decagram" />} onPress={()=>{
                    Linking.openURL("https://saimgmgnyanwin.blogspot.com/2024/12/private-policy-for-tasks.html");
                }}/>
            </List.Section>


            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Button onPress={()=>{
                    logout()
                }} style={{backgroundColor:colors.accent}} mode='elevated' labelStyle={
                    {
                        color:colors.surface
                    }
                }>Logout</Button>
            </View>

        </View>
    )
}
export default MenuScreen