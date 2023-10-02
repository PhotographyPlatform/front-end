import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import cookies from 'react-cookies'
import { decodeToken } from 'react-jwt';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/reducers/auth/user.reducer'

function Header() {
    const isAuth = cookies.load('user_session');
    const decodeAuth = decodeToken(isAuth);

    // for logout 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/signin');

    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Nav className="me-auto">
                    <Link to="/">pixel Time</Link>
                </Nav>
                <Nav className="me-auto">
                    <Button> <Link to="/">Home</Link></Button>
                </Nav>
                {decodeAuth && decodeAuth.userId ? (
                    <Nav className="me-auto">
                        <Button onClick={onOpen}>Logout</Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalBody>
                                    Are You Sure To Logout?
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={handleLogout}>
                                        Logout
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Nav className="me-auto">
                            <Button> <Link to="/profile">profile</Link></Button>
                        </Nav>
                    </Nav>
                ) : (
                    <Nav className="me-auto">
                        <Button><Link to="/signup">signup</Link></Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;
