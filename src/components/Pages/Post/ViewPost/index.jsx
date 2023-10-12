import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

// Import your custom components
import ViewPostHeader from './ViewPostHeader';
import ViewPostParentDetails from './ViewPostParentDetails '; 

import './viewPost.scss'
import { useSelector, useDispatch } from 'react-redux';


function ViewPost(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md');

  
    return (
        <>
      


            <Modal onClose={onClose} isOpen={isOpen}  >
                <ModalOverlay /> 
                <div className='div-handler'>
                <ModalContent className='model-parent-viewpost' size='full' >
                    <ModalHeader className='viewpost-no-space'>
                        {/* Use the ViewPostHeader component */}
                        <ViewPostHeader />
                        <ModalCloseButton />
                    </ModalHeader>
                 
                    <div className='viewpost-no-space viewpost-child'>
                        {/* Use the ViewPostParent component */}
                        <ViewPostParentDetails />
                    </div>
                    {/* <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter> */}
                    </ModalContent>
                </div>
            </Modal>

        </>
    );
}

export default ViewPost;
