import { NavLink, useNavigate } from "react-router-dom";
import { removeAdmin, removeEmail, removeToken } from "./TokenManager";
import { NavDropdown } from "react-bootstrap";
function Logout() {
    const navigate = useNavigate();
    
    function handleClick() {
        removeToken();
        removeEmail();
        removeAdmin();
        window.location.reload();
        
    }

    return (
        <button
            className="btn btn-link nav-link"
            onClick={handleClick}
        >
            <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
        </button>
    );
}

export default Logout;