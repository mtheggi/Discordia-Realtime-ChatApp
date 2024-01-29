import { Button, Alert, Form, Row, Col, Stack } from "react-bootstrap";


const Register = () => {
    return (<Form>
        <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "15%" }}>
            <Col xs={6}>
                <Stack gap={3}>

                    <h2> <strong>Registration </strong></h2>
                    <Form.Control type="text" placeholder="Name" />
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Control type="password" placeholder="Password" />
                    <Button variant="primary" type="submit" >Register</Button>
                    <Alert variant="danger"> <p> An error Occured </p></Alert>
                </Stack>
            </Col>
        </Row>



    </Form >);
}

export default Register;