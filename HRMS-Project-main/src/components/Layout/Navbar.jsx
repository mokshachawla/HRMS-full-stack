import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">

                    HRMS Dashboard

                </span>

                <div className="ms-auto">

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;