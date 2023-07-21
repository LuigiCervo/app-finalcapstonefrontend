import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Dish } from '../models/Dish';
import { getDishById } from '../service/DishService';
import { useParams } from 'react-router-dom';
import './DishDetails.css';

function DishDetails() {

    const params = useParams();

    const [dish, setDish] = useState<Dish | null>(null);

    useEffect(() => {
        getDishById(Number(params.id)).then(d => setDish(d));
    }, [params.id]);

    return (
        <Container className='text-center text-white'>
            <h1><i>{dish?.name}</i></h1>
            <Row className='mt-5'>
                <Col xs={8}>
                    <img id='dish-image' src={`/img/dishes/${dish?.image}`} alt='' />
                </Col>
                <Col xs={4}>
                    {
                        dish?.manufacturer != null &&
                        <div className='text-center mt-5'>
                            <img id='manufacturer-logo' src={`/img/manufacturer/${dish?.manufacturer.image}`} alt='' />
                            <h2 className='mt-3'>By {dish?.manufacturer.name}</h2>
                        </div>
                    }
                    <hr />
                    <p>{dish?.description}</p>
                    <hr />
                    <h3 className='text-start'>{dish?.price} $</h3>
                </Col>
            </Row>
        </Container>
    );
}

export default DishDetails;