import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../images/logo.png';

const Header = (props) => {
    const user = props.user;
    return (
        <Box as="header" bg="gray.800" color="white">
            <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem">
                <Box as="div" align="left" flexGrow="1">
                    <Link to="/">
                        <Image src={logo} h="70px" borderRadius='10px'></Image>
                    </Link>
                </Box>
                <Navigation user={user} />
            </Flex>
        </Box>
    )
}

export default Header;