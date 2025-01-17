import {FlatList, View} from "react-native";
import Task from "./Task";

export default function TaskList({tasks, onPress}) {

    return (<View>
        <FlatList data={tasks}
                  renderItem={({item}) => <Task task={item} handlePress={onPress}/>}
                  keyExtractor={(item) => item.id}/>
    </View>)
}