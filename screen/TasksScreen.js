import {View, StyleSheet} from "react-native";
import useFetchTasks from "../utils/tasks/useFetchTasks";
import TaskList from "../component/TaskList";
import {Text, FAB, ActivityIndicator} from "react-native-paper";
import DialogInput from "../component/DialogInput";
import { useState } from "react";
import useCreateTask from "../utils/tasks/useCreateTask";
import { useUpdateTask } from "../utils/tasks/useUpdateTask";
import { useDeleteTask } from "../utils/tasks/useDeleteTask";
import { useRealTimeTasks } from "../utils/tasks/useRealTimeTasks";
import { useSupabase } from "../utils/SupabaseContext";
import {StatusBar} from "expo-status-bar";

function TasksScreen() {
    useRealTimeTasks();
    const { data: tasks, isLoading, isError, error :fetchTasksError } = useFetchTasks();
    const { mutate: createTask,error:createTaskError, } = useCreateTask();
    const { mutate: updateTask ,error:updateTaskError} = useUpdateTask();
    const { mutate: deleteTask ,error:deleteTaskError} = useDeleteTask();
    const Supabase = useSupabase();
    const [isDialogShown, setDialogShown] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    if (!Supabase) {
        return (
            <View style={styles.center}>
                <Text>Loading Supabase client...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text>Error loading tasks: {fetchTasksError?.message || "Unknown error"}</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text>Error loading tasks: {fetchTasksError?.message || "Unknown error"}</Text>
            </View>
        );
    }
    if (isError) {
        return (
            <View style={styles.center}>
                <Text>Error loading tasks: {fetchTasksError?.message || "Unknown error"}</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator animating={true} />
                <Text>Loading tasks...</Text>
            </View>
        );
    }

    const handleTaskPress = (id) => {
        const task = tasks.find((task) => task.id === id);
        setSelectedTask(task || null);
        setDialogShown(true);
    };

    const handleTaskDelete = (id) => {
        deleteTask(id);
        resetDialog();
    };

    const handleTaskSubmit = (text, isSelected, id) => {
        if (id) {
            updateTask({ id, name: text, completed: isSelected });
        } else {
            createTask({ name: text, completed: isSelected });
        }
        resetDialog();
    };

    const resetDialog = () => {
        setDialogShown(false);
        setSelectedTask(null);
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <DialogInput
                isShown={isDialogShown}
                onAdd={handleTaskSubmit}
                onCancel={resetDialog}
                task={selectedTask}
                onDelete={handleTaskDelete}
            />
            { (tasks&& tasks?.length > 0) ? (
                <TaskList tasks={tasks} onPress={handleTaskPress} />
            ) : (
                <View style={styles.center}>
                    <Text>No tasks available. Add a new task!</Text>
                </View>
            )}
            <FAB
                style={{...styles.fab}}
                onPress={() => setDialogShown(true)}
                icon="plus"

            />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default TasksScreen;