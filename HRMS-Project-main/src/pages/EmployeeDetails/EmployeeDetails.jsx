import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";

import { getEmployeeById } from "../../services/employeeService";

function EmployeeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(id);

            setEmployee(response.data);
            setError("");

        } catch (error) {

            console.error(error);
            setError("Unable to load employee.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadEmployee();

    }, [id]);

    if (loading) {

        return (

            <Layout>

                <PageHeader
                    title="Employee Details"
                    subtitle="Loading Employee..."
                />

                <h3 className="text-center mt-5">
                    Loading...
                </h3>

            </Layout>

        );

    }

    if (error) {

        return (

            <Layout>

                <PageHeader
                    title="Employee Details"
                    subtitle="Employee Profile"
                />

                <div className="alert alert-danger">

                    {error}

                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/employees")}
                >
                    Back
                </button>

            </Layout>

        );

    }

    return (

        <Layout>

            <PageHeader
                title="Employee Details"
                subtitle="Employee Profile"
            />

            {/* Profile Card */}

            <div className="card shadow-sm mb-4">

                <div className="card-body text-center">

                    <div
                        className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"
                        style={{
                            width: "90px",
                            height: "90px",
                            fontSize: "32px",
                            fontWeight: "bold",
                            margin: "0 auto"
                        }}
                    >

                        {employee.firstName.charAt(0)}
                        {employee.lastName.charAt(0)}

                    </div>

                    <h3 className="mt-3">

                        {employee.firstName} {employee.lastName}

                    </h3>

                    <span className="badge bg-secondary">

                        EMP-{String(employee.id).padStart(4, "0")}

                    </span>

                </div>

            </div>

            {/* Personal Information */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">

                    <h5 className="mb-0">

                        Personal Information

                    </h5>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <strong>First Name</strong>

                            <p>{employee.firstName}</p>

                        </div>

                        <div className="col-md-6">

                            <strong>Last Name</strong>

                            <p>{employee.lastName}</p>

                        </div>

                    </div>

                    <hr />

                    <strong>Email</strong>

                    <p>{employee.email}</p>

                </div>

            </div>

            {/* Employment Information */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">

                    <h5 className="mb-0">

                        Employment Information

                    </h5>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <strong>Department</strong>

                            <p>

                                {employee.departmentName || employee.departmentId}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <strong>Salary</strong>

                            <p>

                                ₹ {Number(employee.salary).toLocaleString("en-IN")}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Buttons */}

            <div className="d-flex justify-content-between">

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/employees")}
                >

                    ← Back

                </button>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/employees/edit/${employee.id}`)}
                >

                    ✏ Edit Employee

                </button>

            </div>

        </Layout>

    );

}

export default EmployeeDetails;