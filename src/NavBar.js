import { Link } from "react-router-dom";
import "./Nabvar.css"

export default function Navbar() {
    return (

        <div className="toolbar" role="banner">
            <img width="40" alt="Angular Logo"
                src="/logo192.png" />
            <Link to='/'>Home</Link>
            <Link to="/cards">Cards</Link>
        </div>
    )
}