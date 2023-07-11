import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Card, Heading, Input, Button, FormControl } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChatBody from '../components/ChatBody';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../utils/graphql';

const Connect = (props) => {
    const { id } = useParams();
    const { user, userEmail, socket } = props;
    const [user2, setUser2] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');



    const { data } = useQuery(GET_USER_BY_ID, {
        variables: { id }
    });

    useEffect(() => {
        if (data) {
            setUser2(data.user);
        }
    }, [data]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('message', { message, userEmail, user2Email: user2.email }, (error) => {
                if (error) {
                    console.log(error);
                    toast.error(error, {
                        position: "bottom-left"
                    });
                }
            });
        }
        setMessage('');
    }

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            // elimiate duplicates
            if (!message || messages.find((msg) => msg._id === message._id)) {
                return;
            }
            if (message.sender.email === userEmail) {
                message.user = 1;
            }
            else {
                message.user = 2;
            }

            setMessages([...messages, message]);
        });
    }, [messages, socket]);

    useEffect(() => {
        //init
        socket.emit('init', { userEmail, user2Email: user2.email }, (error) => {
            if (error) {
                console.log(error);
                toast.error(error, {
                    position: "bottom-left"
                });
            }
        });

        socket.on('init', (messages) => {
            if (!messages) return;
            messages.map((message) => {
                if (message.sender.email === userEmail) {
                    message.user = 1;
                }
                else {
                    message.user = 2;
                }
            });
            setMessages(messages);
        });
    }, [user2, userEmail]);



    return (
        <><Box maxWidth="900px" m='auto' mb={5}><RouterLink to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></RouterLink></Box>
            <Card bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10} maxW="900px">
                <Heading as="h2" textAlign="left" mb="2rem">{user2.username}</Heading>
                <ChatBody messages={messages} />
                <form className="form" onSubmit={handleSendMessage}>
                    <FormControl id="message" my={3}>
                        <Input
                            type="text"
                            placeholder="Write message"
                            className="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme='green'>Send</Button>
                </form>
            </Card>
        </>
    )
}

export default Connect;