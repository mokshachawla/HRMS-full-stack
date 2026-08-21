import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>

            <>

                <App />

                <ToastContainer

                    position="top-right"

                    autoClose={3000}

                    hideProgressBar={false}

                    newestOnTop

                    closeOnClick

                    pauseOnHover

                    draggable

                    theme="colored"

                />

            </>

        </AuthProvider>
    </React.StrictMode>
);