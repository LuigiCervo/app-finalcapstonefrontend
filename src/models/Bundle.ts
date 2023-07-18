import { Dish } from "./Dish";

export interface Manufacturer {
    id: number;
    name: string;
    discount: number;
    bundleItems: Dish[];
}
