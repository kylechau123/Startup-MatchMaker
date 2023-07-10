import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Flex, Heading, Input, Button, FormControl, FormLabel, Select } from '@chakra-ui/react';

const Register = (props) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        userName: '',
        email: '',
        password: '',
        type: 'startup'
    });

    useEffect(() => {
        if (props.user) {
            toast.error("You are already logged in", {
                position: "bottom-left"
            });
            navigate("/");
        }
    }, [props.user, navigate]);


    const { userName, email, password, role } = inputValue;

    const handleChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    }

    const handleError = (message) => {
        toast.error(message, {
            position: "bottom-left"
        });
    }

    const handleSuccess = (message) => {
        toast.success(message, {
            position: "bottom-right"
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/register", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValue),
            })
            if (response.ok) {
                handleSuccess("Successfully registered")
                setTimeout(() => {
                            navigate("/profile");
                        }, 1000);
            } else {
                handleError("Error")
            }
            // const { data } = await axios.post(
            //     "http://localhost:3001/api/register",
            //     {
            //         ...inputValue,
            //     },
            //     { withCredentials: true }
            // );
            // const { success, message } = data;
            // if (success) {
            //     handleSuccess(message);
            //     setTimeout(() => {
            //         navigate("/profile");
            //     }, 1000);
            // } else {
            //     handleError(message);
            // }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            userName: "",
            role: ""
        });
    }

    return (
        <Box as="section" bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
            <Flex align="center" justify="center" direction="column">
                <Heading as="h1" size="lg" mb="2rem">Register</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="userName" isRequired mb={3}>
                        <FormLabel>Your Name</FormLabel>
                        <Input type="text" name="userName" value={userName} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="email" isRequired mb={3}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={email} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="password" isRequired mb={3}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={password} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="role" isRequired mb={3}>
                        <FormLabel>What best describes you?</FormLabel>
                        <Select name="role" value={role} onChange={handleChange}>
                            <option value="startup">Startup Owner / Partner</option>
                            <option value="investor">Investor</option>
                        </Select>
                    </FormControl>
                    <Button type="submit" colorScheme="teal" mt="1rem" mb={3}>Register</Button>
                </form>
            </Flex>
        </Box>
    );
}

export default Register;