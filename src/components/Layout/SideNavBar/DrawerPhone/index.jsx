import React, { useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import {
    HamburgerIcon, AddIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon,
} from '@chakra-ui/icons';

function DrawerPhone() {
    const [size, setSize] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClick = (newSize) => {
        setSize(newSize);
        onOpen();
    }

    const sizes = ['sm'];

    return (
        <>
            {sizes.map((size) => (
                <Button
                    onClick={() => handleClick(size)}
                    key={size}
                    m={4}
                >{<HamburgerIcon color='#333' />}</Button>
            ))}

            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{`${size} drawer contents`}</DrawerHeader>
                    <DrawerBody>

                        {/* Here is Can Edit the Link */}

                        <ul>
                            <li>Settings</li>
                            <li>About</li>
                            <li>Logout</li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default DrawerPhone;
