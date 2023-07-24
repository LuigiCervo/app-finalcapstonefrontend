import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import RegisterDTO from "../dto/Register";
import { useState } from "react";

export default function Register() {

    const [result, setResult] = useState<boolean | null>(null);

    function RegisterFunction() {
        const firstNameInput: HTMLInputElement = document.getElementById('firstNameField') as HTMLInputElement;
        const lastNameInput: HTMLInputElement = document.getElementById('lastNameField') as HTMLInputElement;
        const emailInput: HTMLInputElement = document.getElementById('emailField') as HTMLInputElement;
        const passwordInput: HTMLInputElement = document.getElementById('passwordField') as HTMLInputElement;

        const registerData: RegisterDTO = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        fetch("http://localhost:8080/api/auth/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData)
        }).then(response => {
            setResult(response.ok);
        })
    }

    return (
        <Container className="mb-5">
            <Row className="justify-content-center mt-5">
                <Col xs={4}>
                    <Card className="p-4" bg='dark' text="light">
                        <h1 className="text-center">Register</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" id="firstNameField" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" id="lastNameField" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" id="emailField" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" id="passwordField" />
                            </Form.Group>
                        </Form>
                        {
                            result === null &&
                            <Button variant="lg" style={{ backgroundColor: '#F9C448' }} id="passwordField" onClick={RegisterFunction}>Register</Button>
                        }
                        {
                            result === true &&
                            <Alert variant="success">Your account has been created!</Alert>
                        }
                        {
                            result === false &&
                            <Alert variant="danger">An error occurred during the registration.</Alert>
                        }
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}