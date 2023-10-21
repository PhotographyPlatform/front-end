import React, { useEffect } from 'react';
import './navCustome.scss'
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookies'



function NavItem({ name, icon, children, ...rest }) {

    const notificationState = useSelector((state) => state.ChatList.AllNotification);



    return (
        <Box
            as="a"
            href="#"
            style={{ textDecoration: 'none', backgroundColor: '#F9F7F7' }}
            _focus={{ boxShadow: 'none' }}
            className='nav-custome-link'
        >
            <Flex

                // className='nav-custome-link'
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                border="1px solid transparent"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#3F72AF',
                    color: 'white',
                }}

                className='nav-custome-link'

                {...rest}
            >
                {icon && (
                    name !== 'Chat' ? <Icon mr="4" fontSize="20" _groupHover={{ color: 'white', }} as={icon} />
                        : (
                            <Box position={'relative'} >

                                <Box position={'absolute'} display={notificationState ? 'inline-flex' : 'none'} pb={'5px'} bg={'red'} minW={'20px'} h={'20px'} borderRadius={'50%'} justifyContent={'center'} alignItems={'center'} top={'-13px'} color={'white'} right={'8px'}>
                                    <Text m={0}>{notificationState}</Text>
                                </Box>

                                <Icon mr="4" fontSize="20" _groupHover={{ color: 'white', }} as={icon} />
                            </Box>
                        )

                )}
                {children}
            </Flex>
        </Box >
    );
}


export default NavItem;
