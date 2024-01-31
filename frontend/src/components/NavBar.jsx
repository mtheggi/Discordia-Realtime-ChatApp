
import { useContext } from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <Navbar bg="dark" className="mb-4 m-0" style={{ alignContent: "center", height: "3.75rem", width: "100%" }}>
            <Container className="mb-1 mt-2" style={{ width: "100%" }}>
                <Navbar.Brand className="link-light" href="/">
                    <h4>
                        <img
                            alt="Discordia"
                            src="/icons8-chat-room-48.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        <strong>Discordia</strong>
                    </h4>
                </Navbar.Brand>
                <span style={{ color: "green" }}><strong> Logged in as {user?.name} </strong> </span>
                <Nav >
                    <Stack direction="horizontal" >
                        <Nav.Link href="/login" style={{ color: "white" }}> <strong >Login </strong > </Nav.Link>
                        <Nav.Link href="/register" style={{ color: "white" }}> <strong>Register</strong> </Nav.Link>

                    </Stack>
                </Nav>

            </ Container>


        </Navbar >);
}

export default NavBar;