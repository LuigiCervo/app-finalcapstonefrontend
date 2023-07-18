import { Manufacturer } from "./Manufacturer";

export interface Dish {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    manufacturer: Manufacturer | undefined;
}
