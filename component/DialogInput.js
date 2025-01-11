import {View} from "react-native";
import {Portal, Dialog, TextInput, Button, Checkbox} from "react-native-paper";
import {useEffect, useState} from 'react'

export default function DialogInput({onAdd, isShown, onCancel, task, onDelete}) {
    const [text, setText] = useState('');
    const [isSelected, setIsSelected] = useState(false);


    useEffect(() => {
        setText(task ? task.name : '')
        setIsSelected(task ? task.completed : false)
    }, [task])

    const handleAdd = () => {
        if (task) {
            onAdd(text, isSelected, task.id)
        } else {
            onAdd(text, isSelected)
        }

        setIsSelected(false)
        setText('')
    }

    const handleCancel = () => {
        onCancel()
        setIsSelected(false)
        setText('')
    }

    const handleDelete = () => {
        onDelete( task.id)
    }

    return (<View>
        <Portal>
            <Dialog visible={isShown} onDismiss={handleCancel}>
                <Dialog.Title>{task ? 'Update Task' : 'Enter Task'}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        testID='task-input'
                        placeholder="Enter task"
                        value={text}
                        onChangeText={setText}
                    />
                    <Checkbox.Item status={isSelected ? 'checked' : 'unchecked'}
                                   onPress={() => setIsSelected(!isSelected)} label='Completed'/>
                </Dialog.Content>
                <Dialog.Actions>
                    {task && (<Button onPress={handleDelete}  textColor='red'>Delete</Button>)}
                    <Button onPress={handleCancel}>Cancel</Button>
                    <Button onPress={handleAdd} >{task ? 'Update' : 'Add'}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </View>)
}