import api from "./api";

export const getAssetTypes = () => {

    return api.get("/asset-types");

};

export const createAssetType = (assetType) => {

    return api.post("/asset-types", assetType);

};

export const updateAssetType = (id, assetType) => {

    return api.put(`/asset-types/${id}`, assetType);

};

export const deleteAssetType = (id) => {

    return api.delete(`/asset-types/${id}`);

};