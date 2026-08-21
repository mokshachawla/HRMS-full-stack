import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import { saveToken } from "../../utils/token";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await login({

                email,

                password

            });

            const { login } = useAuth();
            login(response.data.token);

            navigate("/dashboard");

        }

        catch (error) {

            alert("Invalid Credentials");

        }

    };
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{width:"420px"}}>

                <h2 className="text-center mb-4">
                    HRMS Login
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;