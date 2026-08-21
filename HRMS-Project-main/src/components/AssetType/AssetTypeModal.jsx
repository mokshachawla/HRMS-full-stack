import "../../styles/modal.css";
import AssetTypeForm from "./AssetTypeForm";

function AssetTypeModal({

                            show,

                            assetType,

                            onClose

                        }) {

    if (!show) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>

                        {

                            assetType

                                ?

                                "Edit Asset Type"

                                :

                                "Add Asset Type"

                        }

                    </h2>

                    <button

                        className="btn btn-danger"

                        onClick={onClose}

                    >

                        X

                    </button>

                </div>

                <AssetTypeForm

                    assetType={assetType}

                    onSuccess={onClose}

                />

            </div>

        </div>

    );

}

export default AssetTypeModal;