import { Link, NavLink } from 'react-router-dom';
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';

import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';


const Navigation = (props) => {
    const user = props.user;

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const logout = () => {
        removeCookie("token");
        window.location = "/?logout=true";
    };

    return (
        <Box as="div" align="right" flexGrow="1">
            <Flex as="ul" align="center" justify="flex-end" wrap="wrap" padding="1rem">
                <Box as="li" listStyleType="none" padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                    <NavLink to="/">Home</NavLink>
                </Box>
                {user ?
                    <>
                        <Menu>
                            <MenuButton as={Box} color="white" _hover={{ color: 'gray.300' }} padding="0.5rem 1rem" background="#2d306d" borderRadius='10px' mx="10px" height="40px" display="flex" alignItems="center">
                                <BsFillPersonLinesFill />
                            </MenuButton>
                            <MenuList backgroundColor="gray.800">
                                <MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                    <NavLink to="/profile"><Flex alignItems="center" gap={3}><BsFillPersonLinesFill /> Profile</Flex></NavLink>
                                </MenuItem>
                                <MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                    <NavLink to="/notifications"><Flex alignItems="center" gap={3}><IoIosNotifications /> Notifications</Flex></NavLink>
                                </MenuItem>
                                <MenuItem color="white" backgroundColor="gray.800" _hover={{ backgroundColor: 'gray.700' }}>
                                    <Link onClick={logout}><Flex alignItems="center" gap={3}><BiLogOut /> Logout</Flex></Link>
                                </MenuItem>
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
    );
}

export default Navigation;