import * as SecureStore from 'expo-secure-store'

export const useFetchPrivate = async () => {
    try{
        const KEY =await SecureStore.getItemAsync('KEY')
        const URL =await SecureStore.getItemAsync('URL')

        return {KEY, URL}
    }catch(err){

        console.log(err.messages)
    }

}