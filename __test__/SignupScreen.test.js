import {render, fireEvent} from "@testing-library/react-native";
import SignupScreen from "../screen/SignupScreen";

test('test sign up', () => {
    const {getByText, getByTestId} = render(<SignupScreen/>)

    const email = getByTestId('email')
    const password = getByTestId('password')
    fireEvent.changeText(email, "sai@smmnw.com")
    fireEvent.changeText(password, "password")
    expect(email.props.value).toBe("sai@smmnw.com")
    expect(password.props.value).toBe("password")
})