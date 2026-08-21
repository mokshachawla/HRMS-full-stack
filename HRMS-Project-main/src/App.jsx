import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import EmployeeDetails from "./pages/EmployeeDetails/EmployeeDetails";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import Departments from "./pages/Departments/Departments";
import Assets from "./pages/Assets/Assets";
import AssetTypes from "./pages/AssetTypes/AssetTypes";
import Policies from "./pages/Policies/Policies";
import Leave from "./pages/Leave/Leave";
import Attendance from "./pages/Attendance/Attendance";
import Payroll from "./pages/Payroll/Payroll";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import AssetAssignments from "./pages/AssetAssignments/AssetAssignments";
import PolicyCategories from "./pages/PolicyCategories/PolicyCategories";
import PolicyVersions from "./pages/PolicyVersions/PolicyVersions";

import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path="/" element={<Login />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Employees */}
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/:id"
                    element={
                        <ProtectedRoute>
                            <EmployeeDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />

                {/* Departments */}
                <Route
                    path="/departments"
                    element={
                        <ProtectedRoute>
                            <Departments />
                        </ProtectedRoute>
                    }
                />

                {/* Assets */}
                <Route
                    path="/assets"
                    element={
                        <ProtectedRoute>
                            <Assets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/asset-types"
                    element={
                        <ProtectedRoute>
                            <AssetTypes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/asset-assignments"
                    element={
                        <ProtectedRoute>
                            <AssetAssignments />
                        </ProtectedRoute>
                    }
                />

                {/* Policies */}
                <Route
                    path="/policies"
                    element={
                        <ProtectedRoute>
                            <Policies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/policy-categories"
                    element={
                        <ProtectedRoute>
                            <PolicyCategories />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/policy-versions"
                    element={
                        <ProtectedRoute>
                            <PolicyVersions />
                        </ProtectedRoute>
                    }
                />

                {/* HR */}
                <Route
                    path="/leave"
                    element={
                        <ProtectedRoute>
                            <Leave />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Attendance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payroll"
                    element={
                        <ProtectedRoute>
                            <Payroll />
                        </ProtectedRoute>
                    }
                />

                {/* Account */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;