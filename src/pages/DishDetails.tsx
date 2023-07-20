import { ChangeEvent, useState, useEffect } from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Dish } from '../models/Dish';
import { getDishById, getDishList } from '../service/DishService';
import { Link, useParams } from 'react-router-dom';

function DishDetails() {

    const params = useParams();

    const [dish, setDish] = useState<Dish | null>(null);

    useEffect(() => {
        getDishById(Number(params.id)).then(d => setDish(d));
    }, []);

    return (
        <Container>
            <h1>{dish?.name}</h1>
            <img src={`/img/dishes/${dish?.image}`} />
            <p>{dish?.description}</p>
        </Container>
    );
}

export default DishDetails;