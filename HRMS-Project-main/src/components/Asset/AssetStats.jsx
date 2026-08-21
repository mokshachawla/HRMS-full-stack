function AssetStats({ assets }) {

    const total = assets.length;

    const assigned =
        assets.filter(
            a => a.status === "Assigned"
        ).length;

    const available =
        assets.filter(
            a => a.status === "Available"
        ).length;

    const maintenance =
        assets.filter(
            a => a.status === "Maintenance"
        ).length;

    return (

        <div className="row mb-4">

            <div className="col">

                <div className="card">

                    <div className="card-body">

                        <h6>Total Assets</h6>

                        <h3>{total}</h3>

                    </div>

                </div>

            </div>

            <div className="col">

                <div className="card">

                    <div className="card-body">

                        <h6>Assigned</h6>

                        <h3>{assigned}</h3>

                    </div>

                </div>

            </div>

            <div className="col">

                <div className="card">

                    <div className="card-body">

                        <h6>Available</h6>

                        <h3>{available}</h3>

                    </div>

                </div>

            </div>

            <div className="col">

                <div className="card">

                    <div className="card-body">

                        <h6>Maintenance</h6>

                        <h3>{maintenance}</h3>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AssetStats;