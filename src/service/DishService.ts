import { Dish } from "../models/Dish";
import { API_GATEWAY_HOST } from "./ServiceCostants";


function createDish(dish: Dish): Promise<boolean> {
    return fetch(`${API_GATEWAY_HOST}/api/dish/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dish)
        })
        .then(response => {
            switch (response.status) {
                case 201:
                    return true;
                default:
                    console.log(response.statusText);
                    return false;
            }
        });
}

function getDishById(id: number): Promise<Dish | null> {

    // Fetch (/api/dish/{id})
    // StatusCode Check
    // 200 -> OK		-> Dish
    // 404 -> NOT FOUND -> null
    return fetch(`${API_GATEWAY_HOST}/api/dish/${id}`)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json().then(json => <Dish>json);
                case 404:
                    return null;
                default:
                    console.log(response.statusText);
                    return null;
            }
        });
}

function getDishList(): Promise<Dish[]> {
    return fetch(`${API_GATEWAY_HOST}/api/dish/list`)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json().then(json => <Dish[]>json);
                default:
                    console.log(response.statusText);
                    return [];
            }
        })
}

function updateDishById(id: number, newDish: Dish): Promise<boolean> {
    return fetch(`${API_GATEWAY_HOST}/api/dish/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDish)
        })
        .then(response => {
            switch (response.status) {
                case 200:
                    return true;
                default:
                    console.log(response.statusText);
                    return false;
            }
        });
}

function deleteDishById(id: number): Promise<boolean> {
    return fetch(`${API_GATEWAY_HOST}/api/dish/${id}`,
        {
            method: "DELETE"
        })
        .then(response => {
            switch (response.status) {
                case 200:
                    return true;
                default:
                    console.log(response.statusText);
                    return false;
            }
        })
}

export { createDish, getDishById, getDishList, updateDishById, deleteDishById };