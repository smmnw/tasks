import {View} from "react-native";
import useFetchTasks from "../utils/tasks/useFetchTasks";
import TaskList from "../component/TaskList";
import {Text, FAB} from 'react-native-paper'
import DialogInput from "../component/DialogInput";
import {useState} from "react";
import useCreateTask from "../utils/tasks/useCreateTask";
import {useUpdateTask} from '../utils/tasks/useUpdateTask'
import {useDeleteTask} from "../utils/tasks/useDeleteTask";
import {useRealTimeTasks} from "../utils/tasks/useRealTimeTasks";

function TasksScreen(props) {
    useRealTimeTasks()
    const {data: tasks, isLoading, isError} = useFetchTasks()
    const {mutate: createTask} = useCreateTask();
    const {mutate: updateTask} = useUpdateTask()
    const {mutate: deleteTask} = useDeleteTask()
    const [isShow, setIsShow] = useState(false);
    const [task, setTask] = useState();


    if (isError) {
        return <View><Text>Error loading tasks</Text></View>
    }


    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    const pressHandler = id => {
        const selected = tasks.filter(task => task.id === id);
        setTask(selected[0]);
        setIsShow(true);
    }

    const onDeleteTask = id => {
        deleteTask(id)
        setIsShow(false);
        setTask(null);
    }
    const onAddTask = (text, isSelected, id) => {
        if (id) {
            updateTask({id: id, name: text, completed: isSelected})

        } else {
            createTask({name: text, completed: isSelected})
        }

        setIsShow(false);
        setTask(null);
    }

    const onCancel = () => {
        setIsShow(false);
        setTask(null);
    }
    return (<View style={{flex: 1}}>
        <DialogInput isShown={isShow} onAdd={onAddTask} onCancel={onCancel} task={task} onDelete={onDeleteTask}/>
        <TaskList tasks={tasks} onPress={pressHandler}/>
        <FAB style={{
            position: 'absolute', margin: 16, right: 0, bottom: 0,
        }}
             onPress={() => {
                 setIsShow(!isShow)
             }} icon='plus'/>
    </View>)
}

export default TasksScreen
