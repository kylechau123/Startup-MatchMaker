import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Flex, Heading, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';

const Login = (props) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (props.user) {
            toast.error("You are already logged in", {
                position: "bottom-left"
            });
            navigate("/");
        }
    }, [props.user, navigate]);

    const { email, password } = inputValue;

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
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            email: '',
            password: ''
        });
    }

    return (
        <Box as="section" bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
            <Flex align="center" justify="center" direction="column">
                <Heading as="h1" size="lg" mb="2rem">Login</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="email" isRequired mb={3}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={email} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="password" isRequired mb={3}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={password} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" mt="1rem" mb={3}>Login</Button>
                </form>
            </Flex>
        </Box>
    );
}

export default Login;