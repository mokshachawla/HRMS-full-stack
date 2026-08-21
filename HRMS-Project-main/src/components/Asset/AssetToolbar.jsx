function AssetToolbar({

                          search,

                          setSearch,

                          onAddAsset

                      }) {

    return (

        <div className="d-flex justify-content-between mb-3">

            <input

                className="form-control w-50"

                placeholder="Search Asset..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                className="btn btn-primary"

                onClick={onAddAsset}

            >

                + Add Asset

            </button>

        </div>

    );

}

export default AssetToolbar;