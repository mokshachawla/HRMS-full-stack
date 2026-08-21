import { useState, useEffect } from "react";
import {
    createEmployee,
    updateEmployee
} from "../../services/employeeService";

function EmployeeForm({ employee: selectedEmployee, onSuccess }) {

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        departmentId: "",
        salary: ""
    });

    useEffect(() => {

        if (selectedEmployee) {

            setEmployee({
                firstName: selectedEmployee.firstName || "",
                lastName: selectedEmployee.lastName || "",
                email: selectedEmployee.email || "",
                departmentId: selectedEmployee.departmentId || "",
                salary: selectedEmployee.salary || ""
            });

        } else {

            setEmployee({
                firstName: "",
                lastName: "",
                email: "",
                departmentId: "",
                salary: ""
            });

        }

    }, [selectedEmployee]);

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !employee.firstName ||
            !employee.lastName ||
            !employee.email ||
            !employee.departmentId ||
            !employee.salary
        ) {

            alert("Please fill all fields.");

            return;

        }

        try {

            if (selectedEmployee) {

                await updateEmployee(selectedEmployee.id, employee);

                alert("Employee Updated Successfully!");

            } else {

                await createEmployee(employee);

                alert("Employee Added Successfully!");

            }

            if (onSuccess) {

                onSuccess();

            }

        } catch (error) {

            console.error(error);

            alert("Operation Failed");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">

                    First Name

                </label>

                <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Last Name

                </label>

                <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Email

                </label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Department

                </label>

                <select
                    className="form-select"
                    name="departmentId"
                    value={employee.departmentId}
                    onChange={handleChange}
                >

                    <option value="">Select Department</option>

                    <option value="1">IT</option>

                    <option value="2">HR</option>

                    <option value="3">Finance</option>

                    <option value="4">Marketing</option>

                    <option value="5">Operations</option>

                </select>

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Salary

                </label>

                <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                />

            </div>

            <button
                type="submit"
                className="btn btn-success w-100"
            >

                {

                    selectedEmployee

                        ?

                        "Update Employee"

                        :

                        "Save Employee"

                }

            </button>

        </form>

    );

}

export default EmployeeForm;