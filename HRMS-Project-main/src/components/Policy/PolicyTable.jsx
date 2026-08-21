function PolicyTable({

                         policies,
                         onEdit,
                         onDelete

                     }) {

    return (

        <table className="table table-striped table-hover">

            <thead className="table-dark">

            <tr>

                <th>ID</th>
                <th>Policy Code</th>
                <th>Title</th>
                <th>Category</th>
                <th>Version</th>
                <th>Status</th>
                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {policies.map((policy) => (

                <tr key={policy.id}>

                    <td>{policy.id}</td>

                    <td>{policy.policyCode}</td>

                    <td>{policy.title}</td>

                    <td>{policy.category}</td>

                    <td>{policy.version}</td>

                    <td>

                        <span
                            className={
                                policy.active
                                    ? "badge bg-success"
                                    : "badge bg-danger"
                            }
                        >
                            {policy.active
                                ? "Active"
                                : "Inactive"}
                        </span>

                    </td>

                    <td>

                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => onEdit(policy)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(policy.id)}
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            ))}

            </tbody>

        </table>

    );

}

export default PolicyTable;