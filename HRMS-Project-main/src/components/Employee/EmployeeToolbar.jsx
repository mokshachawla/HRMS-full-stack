function EmployeeToolbar({

                             search,

                             setSearch,

                             sortBy,

                             setSortBy,

                             onAddEmployee

                         }) {

    return (

        <div className="row mb-4">

            <div className="col-md-5">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="col-md-3">

                <select

                    className="form-select"

                    value={sortBy}

                    onChange={(e) => setSortBy(e.target.value)}

                >

                    <option value="nameAsc">

                        Name A-Z

                    </option>

                    <option value="nameDesc">

                        Name Z-A

                    </option>

                    <option value="salaryLow">

                        Salary Low → High

                    </option>

                    <option value="salaryHigh">

                        Salary High → Low

                    </option>

                </select>

            </div>

            <div className="col-md-4 text-end">

                <button

                    className="btn btn-primary"

                    onClick={onAddEmployee}

                >

                    + Add Employee

                </button>

            </div>

        </div>

    );

}

export default EmployeeToolbar;