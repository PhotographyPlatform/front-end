import { Button, FormControl, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePromise, saveUser } from '../../../../../store/reducers/auth/user.reducer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Code() {
    const navigate = useNavigate()
    const [pinValue, setPinValue] = useState('');
    const dispatch = useDispatch()
    const state = useSelector(state => state.user)
    const data = localStorage.getItem('user')
    const parsed = JSON.parse(data)
    const handlePinChange = (value) => {
        setPinValue(value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(handlePromise(pinValue))
    };
    if (state.user.isLogged === true) {
        navigate('/signin')
    }
    return (
        <form onSubmit={submitHandler}>
            <HStack>
                <FormControl id='code'>
                    <PinInput value={pinValue} onChange={handlePinChange}>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </FormControl>
            </HStack>
            <Button
                mt={4}
                colorScheme='teal'
                type='submit'
            >
                Submit
            </Button>
        </form>
    );
}

export default Code;
