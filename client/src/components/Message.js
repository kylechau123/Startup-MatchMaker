import { Tag, Text, Box } from "@chakra-ui/react";

const Message = ({ message }) => {
    return (
        <Box alignSelf={message.user == 2 ? `flex-end` : `flex-start`} mb="1rem">
            <Tag size="lg" variant="solid" colorScheme={message.user == 1 ? `teal` : `blue`} mb="3px" borderRadius="10px" px="2rem" py="0.5rem" width="fit-content">{message.text}</Tag>
            <Text fontSize="12px" color="gray.500" alignSelf="flex-end"> {new Date(message.createdAt).toLocaleString()} </Text>
        </Box>
    )
}

export default Message;
