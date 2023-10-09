import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

// Import your custom components
import ViewPostHeader from './ViewPostHeader';
import ViewPostParentDetails from './ViewPostParentDetails ';

function ViewPost(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md');

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    }

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

    return (
        <>
            {sizes.map((size) => (
                <Button
                    onClick={() => handleSizeClick('4xl')}
                    key={size}
                    m={4}
                >{`Open ${size} Modal`}</Button>
            ))}

            <Modal onClose={onClose} size={size} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {/* Use the ViewPostHeader component */}
                        <ViewPostHeader />

                    </ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        {/* Use the ViewPostParent component */}
                        <ViewPostParentDetails />

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ViewPost;
