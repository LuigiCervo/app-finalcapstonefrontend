import { ChangeEvent, useState, useEffect } from 'react';
import '../App.css';
import { Dish } from '../models/Dish';

function AdminInterface() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [editedDish, setEditedDish] = useState<Dish>();
  const [newDish, setNewDish] = useState<Dish>({
    id: 0,
    name: "",
    description: "",
    manufacturer: "",
    image: "",
    price: 0
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/dish/list")
      .then(response => response.json())
      .then(response => {
        setDishes(response);
        setIsLoading(false)
      });
  }, []);


  function createDish(dish: Dish) {
    fetch("http://localhost:8080/api/dish/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dish)
      });
  }

  function deleteDish(dish: Dish): void {
    fetch("http://localhost:8080/api/dish/" + dish.id,
      {
        method: "DELETE"
      })
      .then(response => {
        if (response.ok) {
          setDishes(dishes.filter((d) => dish.id != d.id))
        }
      });
  }

  // TODO: Return boolean maybe
  function updateDish(dish: Dish): void {
    fetch("http://localhost:8080/api/dish/" + dish.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dish)
      })
      .then(response => {
        if (response.ok) {
          setEditedDish(undefined);
        }
      });
  }

  return (
    <div>
      <h1>Admin interface</h1>
      <div>
        <h2>Dish</h2>
        <div>
          <h2>New Dish form</h2>
          <div>
            <label htmlFor="inputDishName">Name</label><br />
            <input id='inputDishName' type='text'
              placeholder='name'
              onChange={(e) => {
                newDish.name = e.target.value;
                setNewDish(newDish);
              }}></input><br />

            <label htmlFor="inputDishDescription">Description</label><br />
            <input
              id='inputDishDescription'
              type='text'
              placeholder='description'
              onChange={(e) => {
                var temp = newDish;
                temp.description = e.target.value;
                setNewDish(temp);
              }}></input><br />

            <label htmlFor="inputDishManufacturer">Manufacturer</label><br />
            <input id='inputDishManufacturer' type='text'
              placeholder='manufacturer'
              onChange={(e) => {
                var temp = newDish;
                temp.manufacturer = e.target.value;
                setNewDish(temp);
              }}></input><br />

            <label htmlFor="inputDishImageLink">Image Link</label><br />
            <input
              id='inputDishImageLink'
              type='text'
              placeholder='imageLink'
              onChange={(e) => {
                var temp = newDish;
                temp.image = e.target.value;
                setNewDish(temp);
              }}></input><br />

            <button onClick={() => createDish(newDish)}>Add</button>
          </div>
          <div style={{ border: "2px solid black" }}>
            <h3>{newDish?.name}</h3>
            <p>{newDish?.description}</p>
            <p>{newDish?.manufacturer}</p>
            <img src={newDish?.image} width={300}></img><br />
          </div>
        </div>
        <input type='text' placeholder='Search...' onChange={(e) => { setSearchString(e.target.value) }}></input>
        <ul>
          {
            !isLoading &&
            dishes
              .filter((dish) => {
                const regex = new RegExp(searchString, "gi");
                console.log("Testing for" + dish.name);
                const result = regex.test(dish.name);
                return result;
              }
              )
              .map(dish =>
                <li style={{ border: "2px solid black" }}>
                  {
                    (editedDish?.id == dish.id) &&
                    <div>
                      <label htmlFor="inputEditedDishName">Name</label><br />
                      <input id='inputEditedDishName' type='text'
                        placeholder='name' defaultValue={editedDish.name}
                        onChange={(e) => {
                          var temp = editedDish;
                          temp.name = e.target.value;
                          setEditedDish(temp);
                        }}></input><br />

                      <label htmlFor="inputEditedDishDescription">Description</label><br />
                      <input id='inputEditedDishDescription' type='text'
                        placeholder='description' defaultValue={editedDish.description}
                        onChange={(e) => {
                          var temp = editedDish;
                          temp.description = e.target.value;
                          setEditedDish(temp);
                        }}></input><br />

                      <label htmlFor="inputEditedDishManufacturer">Manufacturer</label><br />
                      <input id='inputEditedDishManufacturer' type='text'
                        placeholder='manufacturer' defaultValue={editedDish.manufacturer}
                        onChange={(e) => {
                          var temp = editedDish;
                          temp.manufacturer = e.target.value;
                          setEditedDish(temp);
                        }}></input><br />

                      <label htmlFor="inputEditedDishImage">Image</label><br />
                      <input id='inputEditedDishImage' type='text'
                        placeholder='image' defaultValue={editedDish.image}
                        onChange={(e) => {
                          var temp = editedDish;
                          temp.image = e.target.value;
                          setEditedDish(temp);
                        }}></input><br />

                      <label htmlFor="inputEditedDishPrice">Price</label><br />
                      <input id='inputEditedDishPrice' type='number'
                        placeholder='price' defaultValue={editedDish.price}
                        onChange={(e) => {
                          var temp = editedDish;
                          temp.price = Number(e.target.value);
                          setEditedDish(temp);
                        }}></input><br />
                      <button onClick={() => setEditedDish(undefined)}>Nevermind :D</button>
                      <button onClick={() => updateDish(dish)}>Apply changes</button>
                    </div>
                  }
                  {
                    (editedDish?.id != dish.id) &&
                    <div>
                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>
                      <p>{dish.manufacturer}</p>
                      <img src={dish.image} width={300}></img><br />
                      <button onClick={() => setEditedDish(dish)}>Edit</button>
                      <button onClick={() => deleteDish(dish)}>Delete</button>
                    </div>
                  }
                </li>
              )
          }
        </ul>
      </div>
    </div>
  );
}

export default AdminInterface;
