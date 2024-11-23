import {fireEvent, render} from "@testing-library/react-native";
import TaskList from "../component/TaskList";

test('render tasks list', () => {
    const tasks=[
        {id:1,name:"One",completed:true},
        {id:2,name:"Two",completed:false},
        {id:3,name:"Three",completed:true},
        {id:4,name:"Four",completed:false}
    ]
    const mockOnPress = jest.fn();
    const {getByText} = render(<TaskList tasks={tasks} onPress={mockOnPress} />)
    let mockItem = getByText('One')
    fireEvent.press(mockItem)
    expect(mockItem).toBeTruthy()
    expect(mockOnPress).toHaveBeenCalled()
})