import { NavLink } from "react-router-dom";

function Sidebar() {

    const linkStyle = {
        display: "block",
        color: "white",
        textDecoration: "none",
        marginBottom: "10px"
    };

    return (

        <div
            style={{
                width: "250px",
                minHeight: "100vh",
                backgroundColor: "#1e293b",
                color: "white",
                padding: "20px"
            }}
        >

            <h2>HRMS</h2>

            <hr />

            <h4>Dashboard</h4>

            <NavLink to="/dashboard" style={linkStyle}>
                Dashboard
            </NavLink>

            <h4>Employee Management</h4>

            <NavLink to="/employees" style={linkStyle}>
                Employees
            </NavLink>

            <NavLink to="/departments" style={linkStyle}>
                Departments
            </NavLink>

            <h4>Asset Management</h4>

            <NavLink to="/assets" style={linkStyle}>
                Assets
            </NavLink>

            <NavLink to="/asset-types" style={linkStyle}>
                Asset Types
            </NavLink>

            <NavLink to="/asset-assignments" style={linkStyle}>
                Asset Assignments
            </NavLink>

            <h4>Policy Management</h4>

            <NavLink to="/policies" style={linkStyle}>
                Policies
            </NavLink>

            <NavLink to="/policy-categories" style={linkStyle}>
                Policy Categories
            </NavLink>

            <NavLink to="/policy-versions" style={linkStyle}>
                Policy Versions
            </NavLink>

            <h4>HR Operations</h4>

            <NavLink to="/leave" style={linkStyle}>
                Leave
            </NavLink>

            <NavLink to="/attendance" style={linkStyle}>
                Attendance
            </NavLink>

            <NavLink to="/payroll" style={linkStyle}>
                Payroll
            </NavLink>

            <h4>Account</h4>

            <NavLink to="/profile" style={linkStyle}>
                Profile
            </NavLink>

            <NavLink to="/settings" style={linkStyle}>
                Settings
            </NavLink>

            <NavLink to="/" style={linkStyle}>
                Logout
            </NavLink>

        </div>

    );

}

export default Sidebar;