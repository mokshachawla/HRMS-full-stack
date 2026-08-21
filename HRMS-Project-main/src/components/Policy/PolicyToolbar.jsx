function PolicyToolbar({

                           search,
                           setSearch,
                           sortBy,
                           setSortBy,
                           onAddPolicy

                       }) {

    return (

        <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="d-flex gap-2">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search policies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "250px" }}
                />

                <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >

                    <option value="titleAsc">
                        Title A-Z
                    </option>

                    <option value="titleDesc">
                        Title Z-A
                    </option>

                    <option value="active">
                        Active First
                    </option>

                    <option value="inactive">
                        Inactive First
                    </option>

                </select>

            </div>

            <button
                className="btn btn-primary"
                onClick={onAddPolicy}
            >
                + Add Policy
            </button>

        </div>

    );

}

export default PolicyToolbar;