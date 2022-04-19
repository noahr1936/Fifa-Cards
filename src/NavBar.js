import { Link } from "react-router-dom";

export default function Navbar() {
    return (

        <div class="toolbar" role="banner">
            <img width="40" alt="Angular Logo"
                src="/logo192.png" />
            <span>Welcome</span>
            <Link to='/'>Home</Link>
            <Link to="/cards">Cards</Link>
        </div>
    )
}