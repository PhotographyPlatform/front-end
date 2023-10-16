import React, { useEffect } from 'react';
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



function NavItem({ name, icon, children, ...rest }) {

    const notificationState = useSelector((state) => state.ChatList.AllNotification);
    // console.log("UUUUUUUUUUUUUUUUIII",notificationState)
    // useEffect(() => {
    //     console.log('dddddddddddddddddddd');
    // }, [notificationState])

    return (
        <Box
            as="a"
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
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
        </Box>
    );
}


export default NavItem;
