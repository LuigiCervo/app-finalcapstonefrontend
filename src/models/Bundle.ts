import { Dish } from "./Dish";

export default interface Bundle {
    id: number;
    name: string;
    discount: number;
    bundleItems: Dish[];
}
