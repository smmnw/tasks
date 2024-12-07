import * as SecureStore from "expo-secure-store";

export const useSavePrivate = async () => {
    try {
        const KEY = process.env.KEY;
        const URL = process.env.URL;

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