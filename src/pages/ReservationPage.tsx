import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import User from "../dto/User";
import { API_GATEWAY_HOST } from "../service/ServiceCostants";
import { Reservation } from "../models/Reservation";
import { useState } from "react";

export default function ReservationPage(props: { authState: { token: string, user: User } | null }) {

    const [result, setResult] = useState<boolean | null>(null);

    function book() {
        const reservationTimeInput: HTMLInputElement = document.getElementById('reservationTimeField') as HTMLInputElement;
        const seatsInput: HTMLInputElement = document.getElementById('seatsField') as HTMLInputElement;

        if (props.authState === null) return;

        const reservationData: any = {
            reservationTime: reservationTimeInput.value,
            seats: Number(seatsInput.value),
            guest: {
                id: props.authState.user.id
            }
        };

        return fetch(`${API_GATEWAY_HOST}/api/reservation/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData)
            })
            .then(response => {
                switch (response.status) {
                    case 201:
                        setResult(true);
                        return;
                    default:
                        console.log(response.statusText);
                        setResult(false);
                        return;
                }
            });
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5 mb-5">
                <Col xs={4}>
                    <Card className="p-4" bg='dark' text="light">
                        <h1 className="text-center">Book a reservation</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Reservation Time</Form.Label>
                                <Form.Control type="datetime-local" defaultValue={(new Date()).toISOString().replace('Z', '')} id="reservationTimeField" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Seats</Form.Label>
                                <Form.Control type="" id="seatsField" defaultValue={1} />
                            </Form.Group>
                        </Form>
                        <Button
                            className="mb-3"
                            variant="lg"
                            style={{ backgroundColor: '#F9C448' }}
                            onClick={book}
                            disabled={props.authState === null}>Get a reservation</Button>
                        {
                            props.authState === null &&
                            <Alert variant="danger">You need to be logged in to book an appointment!</Alert>
                        }

                        {
                            result === true &&
                            <Alert variant="success">Booked successfully!</Alert>
                        }

                        {
                            result === false &&
                            <Alert variant="danger">Error</Alert>
                        }
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}