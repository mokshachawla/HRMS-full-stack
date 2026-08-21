import { CSVLink } from "react-csv";
import { exportToExcel } from "../../utils/exportExcel";

function AssetTypeToolbar({

                              search,

                              setSearch,

                              sortBy,

                              setSortBy,

                              assetTypes = [],

                              onAddAssetType

                          }) {

    const exportData = Array.isArray(assetTypes) ? assetTypes : [];

    return (

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div className="d-flex gap-2">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Asset Types..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "250px" }}
                />

                <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >

                    <option value="nameAsc">
                        Name (A-Z)
                    </option>

                    <option value="nameDesc">
                        Name (Z-A)
                    </option>

                </select>

            </div>

            <div className="d-flex gap-2">

                <CSVLink
                    data={exportData}
                    filename="asset-types.csv"
                    className="btn btn-success"
                >
                    Export CSV
                </CSVLink>

                <button
                    className="btn btn-secondary"
                    onClick={() => exportToExcel(exportData, "AssetTypes")}
                >
                    Export Excel
                </button>

                <button
                    className="btn btn-primary"
                    onClick={onAddAssetType}
                >
                    + Add Asset Type
                </button>

            </div>

        </div>

    );

}

export default AssetTypeToolbar;