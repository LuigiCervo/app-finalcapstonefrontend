import { JwtPayload } from "jwt-decode";

export default interface Token extends JwtPayload {
    name: string;
    admin: boolean;
    golden: boolean;
}