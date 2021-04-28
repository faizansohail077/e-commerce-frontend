import { Link } from "react-router-dom"

const UserNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to="/user/history">History</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/user/password">Password</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/user/wishlist">user History Page</Link></li>
            </ul>
        </nav>
    )
}

export default UserNav
