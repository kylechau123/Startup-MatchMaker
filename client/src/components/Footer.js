import { Box, Flex, Image } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box as="footer" bg="gray.800" color="white" mt="5rem">
            <Flex as="nav" align="center" justify="center" wrap="wrap" padding="1rem">
                <Box as="div" align="center" flexGrow="1">
                    <p>© 2023 Startup Matchmaker</p>
                </Box>
            </Flex>
        </Box>
    )
}

export default Footer;