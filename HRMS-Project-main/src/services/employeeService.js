import api from "./api";

export const getEmployees = (page = 0, size = 10) => {
    return api.get(`/employees?page=${page}&size=${size}`);
};

export const getEmployeeById = (id) => {
    return api.get(`/employees/${id}`);
};

export const createEmployee = (employee) => {
    return api.post("/employees", employee);
};

export const updateEmployee = (id, employee) => {
    return api.put(`/employees/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return api.delete(`/employees/${id}`);
};