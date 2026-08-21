import api from "./api";

// ===========================
// GET ALL ASSETS
// ===========================

export const getAssets = () => {

    return api.get("/assets");

};

// ===========================
// GET ASSET BY ID
// ===========================

export const getAssetById = (id) => {

    return api.get(`/assets/${id}`);

};

// ===========================
// CREATE ASSET
// ===========================

export const createAsset = (asset) => {

    return api.post("/assets", asset);

};

// ===========================
// UPDATE ASSET
// ===========================

export const updateAsset = (id, asset) => {

    return api.put(`/assets/${id}`, asset);

};

// ===========================
// DELETE ASSET
// ===========================

export const deleteAsset = (id) => {

    return api.delete(`/assets/${id}`);

};