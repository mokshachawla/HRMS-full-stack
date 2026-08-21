function DepartmentTable({

                             departments,

                             onEdit,

                             onDelete

                         }) {

    return (

        <table className="table table-striped table-hover">

            <thead className="table-dark">

            <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {

                departments.map((department) => (

                    <tr key={department.id}>

                        <td>{department.id}</td>

                        <td>{department.name}</td>

                        <td>{department.description}</td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => onEdit(department)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onDelete(department.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    );

}

export default DepartmentTable;