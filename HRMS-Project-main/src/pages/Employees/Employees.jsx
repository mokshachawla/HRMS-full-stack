import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";
import EmployeeToolbar from "../../components/Employee/EmployeeToolbar";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeModal from "../../components/Employee/EmployeeModal";
import Pagination from "../../components/Common/Pagination";
import EmployeeStats from "../../components/Dashboard/EmployeeStats";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import { getDepartments } from "../../services/departmentService";
import {
    getEmployees,
    deleteEmployee
} from "../../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("nameAsc");

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, [currentPage]);

    const loadEmployees = async () => {

        try {

            setLoading(true);

            const response = await getEmployees(currentPage - 1, 10);

            console.log(response.data);

            setEmployees(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);

        } catch (error) {

            console.error("Failed to load employees", error);

            setEmployees([]);

        } finally {

            setLoading(false);

        }

    };

    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            if (Array.isArray(response.data)) {

                setDepartments(response.data);

            } else {

                setDepartments(response.data.content || []);

            }

        } catch (error) {

            console.error("Failed to load departments", error);

            setDepartments([]);

        }

    };

    const filteredEmployees = employees.filter((employee) => {

        const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();

        return (

            fullName.includes(search.toLowerCase()) ||

            (employee.email || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    const sortedEmployees = [...filteredEmployees];

    switch (sortBy) {

        case "nameAsc":

            sortedEmployees.sort((a, b) =>
                a.firstName.localeCompare(b.firstName)
            );

            break;

        case "nameDesc":

            sortedEmployees.sort((a, b) =>
                b.firstName.localeCompare(a.firstName)
            );

            break;

        case "salaryLow":

            sortedEmployees.sort(
                (a, b) => Number(a.salary) - Number(b.salary)
            );

            break;

        case "salaryHigh":

            sortedEmployees.sort(
                (a, b) => Number(b.salary) - Number(a.salary)
            );

            break;

        default:
            break;

    }

    useEffect(() => {

        setCurrentPage(1);

    }, [search, sortBy]);

    const openAddModal = () => {

        setSelectedEmployee(null);

        setShowModal(true);

    };

    const openEditModal = (employee) => {

        setSelectedEmployee(employee);

        setShowModal(true);

    };

    const closeModal = async () => {

        setShowModal(false);

        setSelectedEmployee(null);

        await loadEmployees();

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this employee?")) {

            return;

        }

        try {

            await deleteEmployee(id);

            alert("Employee Deleted Successfully!");

            await loadEmployees();

        } catch (error) {

            console.error(error);

            alert("Delete Failed!");

        }

    };

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <Layout>

            <PageHeader
                title="Employees"
                subtitle="Manage all employees"
            />

            <EmployeeStats employees={employees} />

            <EmployeeToolbar
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddEmployee={openAddModal}
            />

            <EmployeeTable
                employees={sortedEmployees}
                departments={departments}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

            <EmployeeModal
                show={showModal}
                employee={selectedEmployee}
                onClose={closeModal}
            />

        </Layout>

    );

}

export default Employees;