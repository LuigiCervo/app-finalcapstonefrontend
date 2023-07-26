import { ChangeEvent, useState, useEffect } from 'react';
import { Dish } from '../models/Dish';
import { Manufacturer } from '../models/Manufacturer';
import { createDish, deleteDishById, getDishList, updateDishById } from '../service/DishService';
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { Reservation } from '../models/Reservation';
import { Check2, Check2All, Check2Square, CheckCircleFill, Trash3Fill } from 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';

function DishListItem(props: { dish: Dish, manufacturers: Manufacturer[], onSuccesfulDeletion(dishId: number, dish: Dish): void, onSuccesfulEdit(dishId: number, dish: Dish): void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDish, setEditedDish] = useState<Dish>({
    id: props.dish.id,
    name: props.dish.name,
    description: props.dish.description,
    image: props.dish.image,
    price: props.dish.price,
    manufacturer: props.dish.manufacturer
  });

  // Normal state button behaviour
  function onEdit() {
    setEditedDish({
      id: props.dish.id,
      name: props.dish.name,
      description: props.dish.description,
      image: props.dish.image,
      price: props.dish.price,
      manufacturer: props.dish.manufacturer
    });
    setIsEditing(true);
  }

  function onDelete() {
    let dishId = props.dish.id;
    deleteDishById(dishId)
      .then(success => {
        if (success) {
          props.onSuccesfulDeletion(dishId, props.dish);
        }
      });
  }

  // Editing state button behaviour
  function onConfirm() {
    updateDishById(editedDish.id, editedDish)
      .then(success => {
        if (success) {
          props.onSuccesfulEdit(editedDish.id, editedDish);
        }
      });
  }

  function onDiscard() {
    setIsEditing(false);
  }

  return !isEditing ? (
    <Card className='card'>
      <Card.Img variant='top' src={`/img/dishes/${props.dish?.image}`} />
      <Card.Body>
        <Card.Title>{props.dish.price}$ | {props.dish.name}</Card.Title>
        <Card.Text>{props.dish.description}</Card.Text>
        {props.dish.manufacturer != null && <Card.Text>Manufacturer: {props.dish.manufacturer.name}</Card.Text>}
        <button className='btn btn-primary' onClick={onEdit}>Edit Dish</button>
        <button className='btn btn-danger ms-2' onClick={onDelete}><Trash3Fill></Trash3Fill></button>
      </Card.Body>
    </Card>
  ) : (
    <Card className='card'>
      <Card.Img variant='top' src={`/img/dishes/${editedDish?.image}`} />
      <Card.Body>
        <Form>
          <Form.Group as={Row} className='mb-3'>
            <Col>
              <Form.Control
                placeholder="image url"
                type='text'
                defaultValue={editedDish.image}
                onChange={(e) => {
                  editedDish.image = e.target.value;
                  setIsEditing(isEditing);
                }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col xs={4}>
              <InputGroup>
                <Form.Control
                  placeholder="price"
                  type='number'
                  defaultValue={editedDish.price}
                  onChange={(e) => {
                    editedDish.price = Number(e.target.value);
                    setIsEditing(isEditing);
                  }} />
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup>
            </Col>

            <Col>
              <Form.Control
                placeholder="name"
                type='text'
                defaultValue={editedDish.name}
                onChange={(e) => {
                  editedDish.name = e.target.value;
                  setIsEditing(isEditing);
                }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col>
              <Form.Control as="textarea"
                placeholder="description"
                type='text'
                defaultValue={editedDish.description}
                onChange={(e) => {
                  editedDish.description = e.target.value;
                  setIsEditing(isEditing);
                }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col xs={3}>
              <InputGroup>
                <InputGroup.Text>{"ID"}</InputGroup.Text>
                <Form.Control placeholder="price" type='number' value={editedDish.id} disabled />
              </InputGroup>
            </Col>

            <Col>
              <Form.Select>
                <option>manufacturer</option>
                {
                  props.manufacturers.map(manufacturer => <option key={manufacturer.id} value={manufacturer.id} selected={manufacturer.id == props.dish.manufacturer?.id} > {manufacturer.name}</option>)
                }
              </Form.Select>
            </Col>

            <Col>
              <button className='btn btn-primary' onClick={onConfirm}>Confirm</button>
              <button className='btn btn-danger ms-2' onClick={onDiscard}>Discard</button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card >
  );
}


function DishManager() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchString, setSearchString] = useState<string>("");
  const [editedDish, setEditedDish] = useState<Dish>();
  const [newDish, setNewDish] = useState<Dish>({
    name: "",
    description: "",
    image: "",
    id: 0,
    manufacturer: undefined,
    price: 0
  });

  useEffect(() => {
    let dishPromise = getDishList()
      .then(dishes => setDishes(dishes));

    let manufacturerPromise = fetch("http://localhost:8080/api/manufacturer/list")
      .then(response => response.json())
      .then(json => setManufacturers(json));

    let reservationPromise = fetch("http://localhost:8080/api/reservation/list")
      .then(response => response.json())
      .then(json => setReservations(json));

    Promise.all([dishPromise, manufacturerPromise, reservationPromise])
      .then(() => setIsLoading(false));
  }, []);

  function addDish(dish: Dish) {
    createDish(dish)
      .then(success => {
        if (success) {
          setDishes([dish, ...dishes]);
        }
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

  function deleteReservation(id: number) {
    fetch("http://localhost:8080/api/reservation/" + id,
      {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          setReservations(reservations.filter(r => r.id != id));
        }
      })
  }

  return (
    <Container>
      <h1 className='text-light'>Reservations: {reservations.length}</h1>
      <ul className='list-group'>
        {
          reservations.map(r =>
            <li className='list-group-item mb-1'>
              <button className='btn btn-danger mx-3' onClick={() => deleteReservation(r.id)}><Trash3Fill></Trash3Fill></button>
              {r.guest.firstName} {r.guest.lastName}, {r.reservationTime} for {r.seats}
            </li>)
        }
      </ul>
      <h1 className='text-light mt-5'>Dish management page</h1>

      <h2 className='text-light'>Dishes:</h2>

      <Container fluid='true'>
        <Row xs={2}>
          {
            !isLoading &&
            dishes
              .filter((dish) => {
                const regex = new RegExp(searchString, "gi");
                const result = regex.test(dish.name);
                return result;
              }
              )
              .map(dish =>
                <Col>
                  <DishListItem
                    dish={dish}
                    manufacturers={manufacturers}
                    onSuccesfulDeletion={(dishId) => setDishes(dishes.filter(d => d.id != dishId))}
                    onSuccesfulEdit={(dishId, dish) => { dishes[dishId] = dish; setDishes(dishes); }} />
                </Col>)
          }
        </Row>
      </Container>



      <div>

        <div>
          <h2 className='text-light'>New Dish form</h2>
          <div>
            <label className='text-light' htmlFor="inputDishName">Name</label><br />
            <input id='inputDishName' type='text'
              placeholder='name'
              onChange={(e) => {
                newDish.name = e.target.value;
                setNewDish(newDish);
              }}></input><br />

            <label className='text-light' htmlFor="inputDishDescription">Description</label><br />
            <input
              id='inputDishDescription'
              type='text'
              placeholder='description'
              onChange={(e) => {
                var temp = newDish;
                temp.description = e.target.value;
                setNewDish(temp);
              }}></input><br />

            <label className='text-light' htmlFor="inputDishManufacturer">Manufacturer</label><br />
            <select
              id='inputDishManufacturer'
              onChange={(e) => {
                if (newDish.manufacturer != undefined) {
                  newDish.manufacturer.id = Number(e.target.value);
                  setNewDish(newDish);
                }
              }}>
              {
                manufacturers.map(manufacturer => <option key={manufacturer.id} value={manufacturer.name}>{manufacturer.name}</option>)
              }
            </select><br />

            <label className='text-light' htmlFor="inputDishImageLink">Image Link</label><br />
            <input
              id='inputDishImageLink'
              type='text'
              placeholder='imageLink'
              onChange={(e) => {
                var temp = newDish;
                temp.image = e.target.value;
                setNewDish(temp);
              }}></input><br />

            <button className='mt-2' onClick={() => addDish(newDish)}>Add</button>
          </div>
          <div style={{ border: "2px solid black" }}>
            <h3>{newDish?.name}</h3>
            <p>{newDish?.description}</p>
            <p>{newDish?.manufacturer?.name}</p>
            <img src={newDish?.image} width={300}></img><br />
          </div>
        </div>
        <input className='mb-3' type='text' placeholder='Search...' onChange={(e) => { setSearchString(e.target.value) }}></input>

      </div>
    </Container>
  );
}

export default DishManager;
