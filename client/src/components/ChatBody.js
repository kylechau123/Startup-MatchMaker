import { Box, Flex, Tag } from '@chakra-ui/react';
import Message from './Message';
const ChatBody = (props) => {
    const messages = props.messages;

    return (
        <Box as="main" bg="gray.100" minH="calc(100vh - 6rem)" h="calc(100vh - 6rem)" borderRadius="10" overflow="scroll">
            <Flex direction="column" mt="1rem" p={5}>
                {messages && messages.map((message) => {
                    return <Message message={message} key={message._id} />
                })}
            </Flex>
        </Box>
    )
}


export default ChatBody;