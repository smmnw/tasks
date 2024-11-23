import React from "react";
import {fireEvent, render} from '@testing-library/react-native'
import {PaperProvider} from "react-native-paper";
import LoginScreen from "../screen/LoginScreen";

test('login screen',  () => {
    const {getByPlaceholderText} = render(<PaperProvider><LoginScreen/></PaperProvider>)
    const email = getByPlaceholderText('Email')
    const password = getByPlaceholderText('Password')
    fireEvent.changeText(email, 'sai@smmnw.com')
    fireEvent.changeText(password, 'password')

    expect(email.props.value).toBe('sai@smmnw.com')
    expect(password.props.value).toBe('password')
})