import { JwtPayload } from "jwt-decode";

export default interface User extends JwtPayload {
    id: number;
    name: string;
    admin: boolean;
    golden: boolean;
}