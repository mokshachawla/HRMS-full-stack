function PolicyStats({ policies }) {

    const totalPolicies = policies.length;

    const activePolicies =
        policies.filter(policy => policy.active).length;

    const inactivePolicies =
        policies.filter(policy => !policy.active).length;

    return (

        <div className="row mb-4">

            <div className="col-md-4">

                <div className="card text-center shadow-sm">

                    <div className="card-body">

                        <h5>Total Policies</h5>

                        <h2>{totalPolicies}</h2>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card text-center shadow-sm">

                    <div className="card-body">

                        <h5>Active Policies</h5>

                        <h2>{activePolicies}</h2>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card text-center shadow-sm">

                    <div className="card-body">

                        <h5>Inactive Policies</h5>

                        <h2>{inactivePolicies}</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PolicyStats;
