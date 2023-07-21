import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Dish } from '../models/Dish';
import { getDishList } from '../service/DishService';
import { Link } from 'react-router-dom';
import './Index.css';

export default function Index() {

    const [dishes, setDishes] = useState<Dish[]>([]);
    const [menu] = useState<{ sectionName: string, indices: number[] }[]>([
        { sectionName: "Appetizers", indices: [5, 6, 7, 8] },
        { sectionName: "Main courses", indices: [11, 12, 13, 14] },
        { sectionName: "Second courses", indices: [15, 16, 17, 19] },
        { sectionName: "Side dishes", indices: [20, 21, 26] },
        { sectionName: "Desserts", indices: [22, 23, 24, 25] }
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
                                    var d = dishes.filter(dish => dish.id === index)[0];
                                    return <li><p><i>{d?.name + " | " + d?.price + "$"} <Link to={`/dish/${index}`} className='detailsLink'>(details)</Link></i></p></li>
                                })
                            }
                        </ul>
                    </div>)
            }
        </Container>
    );
}
