import * as SecureStore from 'expo-secure-store'

const KEY = process.env.KEY
const URL = process.env.URL

export const useSavePrivate = async () => {
    try {
        await SecureStore.setItemAsync("KEY", KEY)
        await SecureStore.setItemAsync("URL", URL)
    } catch (e) {
        console.error(e.message)
    }

}

