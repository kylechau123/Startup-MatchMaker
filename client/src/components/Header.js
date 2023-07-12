import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../images/logo.png';
import { GET_USER } from '../utils/graphql';
import { useQuery } from '@apollo/client';

const Header = (props) => {
    const { user } = props;
    const { loading, data } = useQuery(GET_USER);

    return (
        <Box as="header" bg="gray.800" color="white">
            <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem">
                <Box as="div" alignSelf="flex-start" flexGrow="1">
                    <Link to="/">
                        <Image src={logo} h="70px" borderRadius='10px'></Image>
                    </Link>
                </Box>
                <Navigation user={user} data={data} />
            </Flex>
        </Box>
    )
}

export default Header;