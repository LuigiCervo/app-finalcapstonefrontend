import { useNavigate } from "react-router-dom";

export default function Logout(props: { setAuthStateAction(token: any): void }) {
    const navigate = useNavigate();
    props.setAuthStateAction(null);
    navigate('/');
    return (<p>Logged out</p>);
}
