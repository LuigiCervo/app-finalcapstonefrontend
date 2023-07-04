
import { useState } from 'react';
import './App.css';
import { Dish } from './models/Dish';

function App() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  fetch("http://localhost:8080/api/dish/list")
    .then(response => response.json())
    .then(response => {
      setDishes(response);
      setIsLoading(false)
    });

  return (
    <div className="App">
      <h1>Menu</h1>
      <ul>
        {
          !isLoading &&
          dishes.map(dish =>
            <li key={dish.id} className='card'>
              <p className='card-header'>{dish.name}</p>
              <img src={dish.image} alt="" />
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
