import { Dish } from "./Dish";

export interface Manufacturer {
    id: number;
    name: string;
    description: string;
    image: string;
    dishes: Dish[];
}
