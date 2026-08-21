function EmployeeStatCard({

                              title,

                              value,

                              icon,

                              color

                          }) {

    return (

        <div className="col-md-3 mb-3">

            <div
                className="card shadow-sm border-0"
                style={{
                    borderLeft: `5px solid ${color}`
                }}
            >

                <div className="card-body">

                    <div className="d-flex justify-content-between">

                        <div>

                            <small className="text-muted">

                                {title}

                            </small>

                            <h2 className="mt-2">

                                {value}

                            </h2>

                        </div>

                        <div
                            style={{
                                fontSize: "42px"
                            }}
                        >

                            {icon}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeStatCard;