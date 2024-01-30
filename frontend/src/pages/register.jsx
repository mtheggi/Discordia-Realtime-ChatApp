import { Button, Alert, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Register = () => {
    // const { user, setUser } = useContext(AuthContext);
    const { registerInfo, setRegisterInfo } = useContext(AuthContext);

    return (
        <Form>
            <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "15%" }}>
                <Col xs={6}>
                    <Stack gap={3}>

                        <h2> <strong>Registration </strong></h2>

                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
                        />
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(e) => { setRegisterInfo({ ...registerInfo, email: e.target.value }) }}
                        />
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => { setRegisterInfo({ ...registerInfo, Password: e.target.value }) }}
                        />
                        <Button variant="primary" type="submit" >Register</Button>

                        <Alert variant="danger"> <p> An error Occured </p></Alert>
                    </Stack>
                </Col>
            </Row>
        </Form >
    );
}

export default Register;