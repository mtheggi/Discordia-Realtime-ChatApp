/*eslint-disable */
import { useContext } from "react";
import { Button, Alert, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
    const { loginUser, loginInfo, setLoginInfo, loginError, isLoginLoading } = useContext(AuthContext)
    return (<Form onSubmit={loginUser}>
        <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "15%" }}>
            <Col xs={6}>
                <Stack gap={3}>

                    <h2> <strong>Login </strong></h2>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} />
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
                    <Button variant="primary" type="submit" >{isLoginLoading ? "Loggin you in " : "Login"} </Button>


                    {loginError?.error ? <Alert variant="danger"><p> {loginError.message} </p></Alert> : <p></p>}
                </Stack>
            </Col>
        </Row>



    </Form >);
}

export default Login;