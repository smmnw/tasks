import {createClient} from '@supabase/supabase-js'
import {KEY, URL} from '../PRIVATE'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Supabase = createClient(URL, KEY,{
    auth:{
        persistSession:true,
        autoRefreshToken:true,
        storage:AsyncStorage
    }
})
