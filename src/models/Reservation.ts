import { User } from "./User";

export interface Reservation {
    id: number;
    reservationTime: string;
    seats: number;
    guest: User;
}
