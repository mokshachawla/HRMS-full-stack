import { useNavigate } from "react-router-dom";

function EmployeeTable({

                           employees = [],

                           departments = [],

                           onEdit,

                           onDelete

                       }) {

    const navigate = useNavigate();

    return (

        <div className="card shadow-sm">

            <div className="card-body p-0">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-dark">

                    <tr>

                        <th className="text-center">Avatar</th>

                        <th>ID</th>

                        <th>Employee</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Salary</th>

                        <th className="text-center">Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {employees.length === 0 ? (

                        <tr>

                            <td colSpan="7" className="text-center py-5">

                                <i className="bi bi-people fs-1 text-secondary"></i>

                                <h5 className="mt-3">

                                    No Employees Found

                                </h5>

                                <p className="text-muted">

                                    Add your first employee to get started.

                                </p>

                            </td>

                        </tr>

                    ) : (

                        employees.map((employee) => {

                            const department = departments.find(

                                (dept) => dept.id === employee.departmentId

                            );

                            return (

                                <tr key={employee.id}>

                                    <td className="text-center">

                                        <div

                                            className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"

                                            style={{

                                                width: "45px",

                                                height: "45px",

                                                fontWeight: "bold",

                                                fontSize: "16px"

                                            }}

                                        >

                                            {employee.firstName.charAt(0)}

                                            {employee.lastName.charAt(0)}

                                        </div>

                                    </td>

                                    <td>

                                        EMP-

                                        {String(employee.id).padStart(4, "0")}

                                    </td>

                                    <td>

                                        <strong>

                                            {employee.firstName}{" "}

                                            {employee.lastName}

                                        </strong>

                                    </td>

                                    <td>

                                        <i className="bi bi-envelope-fill text-primary me-2"></i>

                                        {employee.email}

                                    </td>

                                    <td>

                                            <span className="badge bg-success">

                                                {department

                                                    ? department.name

                                                    : "Not Assigned"}

                                            </span>

                                    </td>

                                    <td>

                                            <span className="fw-bold text-success">

                                                ₹{" "}

                                                {Number(

                                                    employee.salary

                                                ).toLocaleString("en-IN")}

                                            </span>

                                    </td>

                                    <td className="text-center">

                                        <button

                                            className="btn btn-info btn-sm me-2"

                                            title="View"

                                            onClick={() =>

                                                navigate(

                                                    `/employees/${employee.id}`

                                                )

                                            }

                                        >

                                            <i className="bi bi-eye-fill"></i>

                                        </button>

                                        <button

                                            className="btn btn-warning btn-sm me-2"

                                            title="Edit"

                                            onClick={() =>

                                                onEdit(employee)

                                            }

                                        >

                                            <i className="bi bi-pencil-square"></i>

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            title="Delete"

                                            onClick={() =>

                                                onDelete(employee.id)

                                            }

                                        >

                                            <i className="bi bi-trash-fill"></i>

                                        </button>

                                    </td>

                                </tr>

                            );

                        })

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default EmployeeTable;