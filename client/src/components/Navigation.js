import { Link, NavLink } from 'react-router-dom';
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Image } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import { BsPersonSquare } from 'react-icons/bs';
import { BiDollar } from 'react-icons/bi';
import { GET_USER } from '../utils/graphql';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';


const Navigation = (props) => {
    const user = props.user;

    const { loading, data } = useQuery(GET_USER);
    const [loaded, setLoaded] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const logout = () => {
        removeCookie("token");
        window.location = "/?logout=true";
    };

    useEffect(() => {
        if (!loaded && !loading && data) {
            setLoaded(true);
        }
    }, [loading, data]);

    return (
        <>
            <Box as="div" alignSelf="right" flexGrow="1">
                <Flex as="ul" align="center" justify="flex-end" wrap="wrap" padding="1rem">
                    <Box as="li" listStyleType="none" padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                        <NavLink to="/">Home</NavLink>
                    </Box>
                    {user ?
                        !loading && data &&
                        <>
                            <Menu>
                                <MenuButton as={Box} color="white" _hover={{ color: 'gray.300' }} padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                                    <BsFillPersonLinesFill />
                                </MenuButton>
                                <MenuList backgroundColor="gray.800">
                                    <MenuItem color="orange" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                        <Flex alignItems="center" gap={3}> <BsPersonSquare /> {!loading ? data.user2.username : 'User'} </Flex>
                                    </MenuItem>
                                    <NavLink to="/profile">
                                        <MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                            <Flex alignItems="center" gap={3}><BsFillPersonLinesFill /> Profile</Flex>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to="/notifications"><MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                        <Flex alignItems="center" gap={3}><IoIosNotifications /> Notifications</Flex>
                                    </MenuItem>
                                    </NavLink>
                                    {data && data.user2.role == "investor" && <NavLink to="/myinvestments"><MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                        <Flex alignItems="center" gap={3}><BiDollar /> My Investments</Flex>
                                    </MenuItem>
                                    </NavLink>}
                                    <Link onClick={logout}><MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                        <Flex alignItems="center" gap={3}><BiLogOut /> Logout</Flex>
                                    </MenuItem>
                                    </Link>
                                </MenuList>
                            </Menu>
                        </>
                        :
                        <>
                            <Box as="li" listStyleType="none" padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                                <NavLink to="/login">Login</NavLink>
                            </Box>
                            <Box as="li" listStyleType="none" padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                                <NavLink to="/register">Register</NavLink>
                            </Box>
                        </>
                    }
                </Flex>
            </Box>
        </>
    );
}

export default Navigation;