import * as SecureStore from "expo-secure-store";
//import {KEY,URL} from '@env' for eas cloud build
export const useSavePrivate = async () => {

    // for eas local build insert key and url
   let KEY=''
    let  URL=''

    try {
        if (!KEY || !URL) {
            throw new Error("Missing environment variables.");
        }

        // Save to secure storage
        await SecureStore.setItemAsync("KEY", KEY);
        await SecureStore.setItemAsync("URL", URL);
    } catch (error) {
        console.error("Error saving private credentials:", error.message);
    }
};