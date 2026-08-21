import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {

    createAssetType,

    updateAssetType

} from "../../services/assetTypeService";

function AssetTypeForm({

                           assetType: selectedAssetType,

                           onSuccess

                       }) {

    const [assetType, setAssetType] = useState({

        name: "",

        description: ""

    });

    useEffect(() => {

        if (selectedAssetType) {

            setAssetType({

                name: selectedAssetType.name || "",

                description: selectedAssetType.description || ""

            });

        }

        else {

            setAssetType({

                name: "",

                description: ""

            });

        }

    }, [selectedAssetType]);

    const handleChange = (e) => {

        setAssetType({

            ...assetType,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!assetType.name.trim()) {

            alert("Asset Type Name is required.");

            return;

        }

        try {

            if (selectedAssetType) {

                await updateAssetType(

                    selectedAssetType.id,

                    assetType

                );

                toast.success("Asset Type Updated Successfully!");

            }

            else {

                await createAssetType(assetType);

                toast.success("Asset Type Added Successfully!");

            }

            if (onSuccess) {

                onSuccess();

            }

        }

        catch (error) {

            console.error(error);

            toast.error("Operation Failed!");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">

                    Asset Type Name

                </label>

                <input

                    type="text"

                    className="form-control"

                    name="name"

                    value={assetType.name}

                    onChange={handleChange}

                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Description

                </label>

                <textarea

                    className="form-control"

                    rows="4"

                    name="description"

                    value={assetType.description}

                    onChange={handleChange}

                />

            </div>

            <button

                type="submit"

                className="btn btn-success w-100"

            >

                {

                    selectedAssetType

                        ?

                        "Update Asset Type"

                        :

                        "Save Asset Type"

                }

            </button>

        </form>

    );

}

export default AssetTypeForm;