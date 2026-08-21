import StatCard from "./StatCard";

function DashboardCards() {

    return (

        <div className="row">

            <div className="col-md-3">

                <StatCard
                    title="Employees"
                    value="120"
                    color="#0d6efd"
                />

            </div>

            <div className="col-md-3">

                <StatCard
                    title="Departments"
                    value="10"
                    color="#198754"
                />

            </div>

            <div className="col-md-3">

                <StatCard
                    title="Assets"
                    value="350"
                    color="#ffc107"
                />

            </div>

            <div className="col-md-3">

                <StatCard
                    title="Payroll"
                    value="₹18.2L"
                    color="#dc3545"
                />

            </div>

        </div>

    );

}

export default DashboardCards;