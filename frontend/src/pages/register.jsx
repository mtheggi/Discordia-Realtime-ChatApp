/*eslint-disable*/

import { Button, Alert, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Register = () => {
    // const { user, setUser } = useContext(AuthContext);
    const { user, registerInfo, setRegisterInfo, registerError, registerUser, isRegisterLoading, success } = useContext(AuthContext);


    return (
        <Form onSubmit={registerUser}>
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
                            onChange={(e) => { setRegisterInfo({ ...registerInfo, password: e.target.value }) }}
                        />
                        <Button variant="primary" type="submit" >
                            {isRegisterLoading ? "Creating Your Account" : "Register"}

                        </Button>
                        {
                            registerError?.error ? <Alert variant="danger"> <p>{registerError.message}</p></Alert> :
                                (success ? <Alert variant="success"> <p>Registration successuful please login</p></Alert> : <p></p>)}

                    </Stack>
                </Col>
            </Row>
        </Form >
    );
}

export default Register;