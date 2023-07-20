import { ChangeEvent, useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Dish } from '../models/Dish';
import { getDishList } from '../service/DishService';
import { Link } from 'react-router-dom';
import './Index.css';

export function Index() {

    const [dishes, setDishes] = useState<Dish[]>([]);
    const [menu, setMenu] = useState<{ sectionName: string, indices: number[] }[]>([
        { sectionName: "Antipasti", indices: [5, 6, 7, 8] },
        { sectionName: "Primi", indices: [11, 12, 13, 14] },
        { sectionName: "Secondi", indices: [15, 16, 17, 19] },
        { sectionName: "Contorni", indices: [20, 21, 26] },
        { sectionName: "Dessert", indices: [22, 23, 24, 25] }
    ]);

    useEffect(() => {
        getDishList().then(dishList => setDishes(dishList));
    }, []);

    return (
        <Container className='text-center text-white'>
            <h1><i><b>Menu</b></i></h1>
            {
                menu.map(section =>
                    <div>
                        <h2><b>{section.sectionName}</b></h2>
                        <ul className='list-unstyled'>
                            {
                                section.indices.map(index => {
                                    var d = dishes.filter(dish => dish.id == index)[0];
                                    return <li><p><i>{d?.name + " | " + d?.price + "$"}   <Link to={`/dish/${index}`}>(details)</Link></i></p></li>
                                })
                            }
                        </ul>
                    </div>)
            }
        </Container>
    );
}
