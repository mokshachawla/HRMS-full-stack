function AssetTypeStats({ assetTypes }) {

    return (

        <div className="row mb-4">

            <div className="col-md-4">

                <div className="card shadow-sm">

                    <div className="card-body text-center">

                        <h5>Total Asset Types</h5>

                        <h2>{assetTypes.length}</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AssetTypeStats;