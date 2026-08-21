import api from "./api";

export const getPolicies = (page = 0, size = 10) => {
    return api.get(`/policies?page=${page}&size=${size}`);
};

export const getPolicyById = (id) => {
    return api.get(`/policies/${id}`);
};

export const createPolicy = (policy) => {
    return api.post("/policies", policy);
};

export const updatePolicy = (id, policy) => {
    return api.put(`/policies/${id}`, policy);
};

export const deletePolicy = (id) => {
    return api.delete(`/policies/${id}`);
};