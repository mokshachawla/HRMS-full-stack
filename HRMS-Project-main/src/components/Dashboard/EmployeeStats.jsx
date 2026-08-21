function EmployeeStats({ employees }) {

    const totalEmployees = employees.length;

    const salaries = employees.map(e => Number(e.salary));

    const averageSalary =
        salaries.length > 0
            ? Math.round(
                salaries.reduce((a, b) => a + b, 0) / salaries.length
            )
            : 0;

    const highestSalary =
        salaries.length > 0
            ? Math.max(...salaries)
            : 0;

    const lowestSalary =
        salaries.length > 0
            ? Math.min(...salaries)
            : 0;

    return (

        <div className="row mb-4">

            <div className="col-md-3">

                <div className="card text-center shadow">

                    <div className="card-body">

                        <h6>Total Employees</h6>

                        <h3>{totalEmployees}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center shadow">

                    <div className="card-body">

                        <h6>Average Salary</h6>

                        <h3>₹ {averageSalary}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center shadow">

                    <div className="card-body">

                        <h6>Highest Salary</h6>

                        <h3>₹ {highestSalary}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center shadow">

                    <div className="card-body">

                        <h6>Lowest Salary</h6>

                        <h3>₹ {lowestSalary}</h3>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeStats;