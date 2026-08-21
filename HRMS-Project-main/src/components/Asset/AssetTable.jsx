function AssetTable({

                        assets,

                        onEdit,

                        onDelete

                    }) {

    return (

        <table className="table table-striped table-hover">

            <thead className="table-dark">

            <tr>

                <th>ID</th>

                <th>Asset Name</th>

                <th>Asset Type</th>

                <th>Serial Number</th>

                <th>Assigned Employee</th>

                <th>Status</th>

                <th>Purchase Date</th>

                <th>Purchase Price</th>

                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {

                assets.length === 0 ?

                    (

                        <tr>

                            <td
                                colSpan="9"
                                className="text-center py-5"
                            >

                                <h5>No Assets Found</h5>

                                <p className="text-muted">

                                    Click "Add Asset" to create your first asset.

                                </p>

                            </td>

                        </tr>

                    )

                    :

                    (

                        assets.map((asset) => (

                            <tr key={asset.id}>

                                <td>{asset.id}</td>

                                <td>{asset.assetName}</td>

                                <td>{asset.assetTypeName}</td>

                                <td>{asset.serialNumber}</td>

                                <td>{asset.employeeName}</td>

                                <td>{asset.status}</td>

                                <td>{asset.purchaseDate}</td>

                                <td>₹ {asset.purchasePrice}</td>

                                <td>

                                    <button

                                        className="btn btn-warning btn-sm me-2"

                                        onClick={() => onEdit(asset)}

                                    >

                                        Edit

                                    </button>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() => onDelete(asset.id)}

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    )

            }

            </tbody>

        </table>

    );

}

export default AssetTable;