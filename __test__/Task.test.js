import {fireEvent, render} from "@testing-library/react-native";
import React from "react";
import Task from "../component/Task";
import {PaperProvider} from 'react-native-paper'

test('renders Task.js with item and handle onClick', () => {
    const mockTask={id: 1, name: "TASK1",completed: false};
    const mockPressedTask=jest.fn();

    const {getByText} = render(<PaperProvider> <Task task={mockTask} handlePress={mockPressedTask}/> </PaperProvider>)
    fireEvent.press(getByText('TASK1'))

    expect(getByText('TASK1')).toBeTruthy()
    expect(mockPressedTask).toBeCalled()
})