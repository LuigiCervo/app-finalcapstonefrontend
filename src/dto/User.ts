import { JwtPayload } from "jwt-decode";

export default interface User extends JwtPayload {
    name: string;
    admin: boolean;
    golden: boolean;
}