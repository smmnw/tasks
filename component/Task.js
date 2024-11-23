import {Card, Checkbox, Text} from 'react-native-paper'
import {View} from "react-native";

export default function Task({task, handlePress}) {
    return (
        <Card onPress={() => {
        handlePress(task.id)
    }}>
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10
        }}>
            <Text>{task.name}</Text>
            <Checkbox status={task.completed ? 'checked' : 'unchecked'}/>
        </View>
    </Card>)
}