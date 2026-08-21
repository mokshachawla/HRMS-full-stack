import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";

import {
    getEmployeeById,
    updateEmployee
} from "../../services/employeeService";

import { getDepartments } from "../../services/departmentService";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({

        firstName: "",

        lastName: "",

        email: "",

        departmentId: "",

        salary: ""

    });

    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEmployee();

        loadDepartments();

    }, [id]);

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(id);

            setEmployee(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setEmployee({

            ...employee,

            [name]: value

        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await updateEmployee(id, employee);

            alert("Employee Updated Successfully!");

            navigate("/employees");

        }

        catch (error) {

            console.error(error);

            alert("Failed to update employee.");

        }

    };

    return (

        <Layout>

            <PageHeader
                title="Edit Employee"
                subtitle="Update Employee Information"
            />

            <div className="card shadow p-4">

                <form onSubmit={handleSubmit}>

                    {/* First Name */}

                    <div className="mb-3">

                        <label className="form-label">

                            First Name

                        </label>

                        <input

                            type="text"

                            name="firstName"

                            className="form-control"

                            value={employee.firstName}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Last Name */}

                    <div className="mb-3">

                        <label className="form-label">

                            Last Name

                        </label>

                        <input

                            type="text"

                            name="lastName"

                            className="form-control"

                            value={employee.lastName}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Email */}

                    <div className="mb-3">

                        <label className="form-label">

                            Email

                        </label>

                        <input

                            type="email"

                            name="email"

                            className="form-control"

                            value={employee.email}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Department */}

                    <div className="mb-3">

                        <label className="form-label">

                            Department

                        </label>

                        <select

                            name="departmentId"

                            className="form-select"

                            value={employee.departmentId}

                            onChange={handleChange}

                        >

                            <option value="">

                                Select Department

                            </option>

                            {

                                departments.map((department) => (

                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >

                                        {department.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Salary */}

                    <div className="mb-3">

                        <label className="form-label">

                            Salary

                        </label>

                        <input

                            type="number"

                            name="salary"

                            className="form-control"

                            value={employee.salary}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="d-flex justify-content-end">

                        <button

                            type="button"

                            className="btn btn-secondary me-2"

                            onClick={() => navigate("/employees")}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="btn btn-primary"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </Layout>

    );

}

export default EditEmployee;