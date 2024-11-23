import { render} from "@testing-library/react-native";
import DialogInput from "../component/DialogInput";
import {PaperProvider} from 'react-native-paper'

test('test dialog',  () => {
    const {getByTestId} = render(<PaperProvider><DialogInput isShown={true} onAdd={()=>{}}/></PaperProvider>)
    expect(getByTestId('task-input')).toBeTruthy()
})