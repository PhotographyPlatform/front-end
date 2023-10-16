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
import { useDispatch, useSelector } from 'react-redux';
import { logOut, uderData } from '../../../store/reducers/auth/user.reducer'
import Cookies from 'react-cookies';
import { useNavigate } from 'react-router';
import { getImages } from '../../../store/reducers/profile/profile.reducer';
import NotifiList from '../notificationList';
function MobileNav({ onOpen, ...rest }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.user.user)
    const image = useSelector(state => state.profile)

    useEffect(() => {
        const userData = Cookies.load('user')
        dispatch(getImages())
        dispatch(uderData(userData))
    }, [])

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/signin');

    };
    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('gray.200', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Stories
            </Text>

            <HStack spacing={{ base: '0', md: '6' }} >
                {/* <IconButton size="lg" variant="ghost" aria-label="open menu" /> */}
                {/* <NotifiList size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
                <NotifiList />
                <Flex alignItems={'center'}>
                    <Menu>
                        {
                            data &&
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                                <HStack>
                                    {
                                        image.allImages &&
                                        <Avatar
                                            size={'sm'}
                                            src={image.allImages.profileImg}
                                        />
                                    }

                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm">{data.firstName}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            {data.role}
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: 'none', md: 'flex' }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                        }

                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                        >
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
}

export default MobileNav;