import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import LoginDTO from "../dto/Login";
import { useNavigate } from "react-router-dom";

export default function Login(props: { setAuthStateAction(token: any): void }) {

    const navigate = useNavigate();

    function LoginFunction() {
        const emailInput: HTMLInputElement = document.getElementById('emailField') as HTMLInputElement;
        const passwordInput: HTMLInputElement = document.getElementById('passwordField') as HTMLInputElement;

        const loginData: LoginDTO = { email: emailInput.value, password: passwordInput.value };

        fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        }).then(response => {
            console.log(response.status);
            if (response.ok) {
                response.text().then(tokenString => {
                    props.setAuthStateAction({ token: tokenString, user: JSON.parse(atob(tokenString.split('.')[1])) });
                    navigate('/');
                });
            }
        })
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={4}>
                    <Card className="p-4" bg='dark' text="light">
                        <h1 className="text-center">Login</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" id="emailField" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" id="passwordField" />
                            </Form.Group>
                        </Form>
                        <Button variant="lg" style={{ backgroundColor: '#F9C448' }} id="passwordField" onClick={LoginFunction}>Login</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}