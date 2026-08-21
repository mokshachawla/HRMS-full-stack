function DepartmentToolbar({

                               search,
                               setSearch,
                               onAddDepartment

                           }) {

    return (

        <div className="d-flex justify-content-between align-items-center mb-3">

            <input
                type="text"
                className="form-control w-50"
                placeholder="Search Department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={onAddDepartment}
            >

                + Add Department

            </button>

        </div>

    );

}

export default DepartmentToolbar;