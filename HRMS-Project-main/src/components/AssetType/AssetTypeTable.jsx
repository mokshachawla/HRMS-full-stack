function AssetTypeTable({

                            assetTypes,

                            onEdit,

                            onDelete

                        }) {

    return (

        <table className="table table-striped table-hover">

            <thead className="table-dark">

            <tr>

                <th>#</th>

                <th>ID</th>

                <th>Name</th>

                <th>Description</th>

                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {

                assetTypes.length === 0

                    ?

                    <tr>

                        <td colSpan="5" className="text-center py-5">

                            <h5>No Asset Types Found</h5>

                            <p className="text-muted">

                                Click the "Add Asset Type" button to create your first Asset Type.

                            </p>

                        </td>

                    </tr>

                    :

                    assetTypes.map((assetType) => (

                        <tr key={assetType.id}>

                            <td>{assetType.id}</td>

                            <td>{assetType.id}</td>

                            <td>{assetType.name}</td>

                            <td>{assetType.description}</td>

                            <td>

                                <button

                                    className="btn btn-warning btn-sm me-2"

                                    onClick={() => onEdit(assetType)}

                                >

                                    Edit

                                </button>

                                <button

                                    className="btn btn-danger btn-sm"

                                    onClick={() => onDelete(assetType.id)}

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

export default AssetTypeTable;