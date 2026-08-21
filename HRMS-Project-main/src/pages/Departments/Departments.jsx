import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";
import DepartmentToolbar from "../../components/Department/DepartmentToolbar";
import DepartmentTable from "../../components/Department/DepartmentTable";
import DepartmentModal from "../../components/Department/DepartmentModal";
import Pagination from "../../components/Common/Pagination";

import {
    getDepartments,
    deleteDepartment
} from "../../services/departmentService";

function Departments() {

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const departmentsPerPage = 5;

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredDepartments = departments.filter((department) =>

        department.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const indexOfLastDepartment =
        currentPage * departmentsPerPage;

    const indexOfFirstDepartment =
        indexOfLastDepartment - departmentsPerPage;

    const currentDepartments =
        filteredDepartments.slice(
            indexOfFirstDepartment,
            indexOfLastDepartment
        );

    const totalPages =
        Math.ceil(
            filteredDepartments.length /
            departmentsPerPage
        );

    useEffect(() => {

        setCurrentPage(1);

    }, [search]);

    const openAddModal = () => {

        setSelectedDepartment(null);

        setShowModal(true);

    };

    const openEditModal = (department) => {

        setSelectedDepartment(department);

        setShowModal(true);

    };

    const closeModal = async () => {

        setShowModal(false);

        setSelectedDepartment(null);

        await loadDepartments();

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this department?"

        );

        if (!confirmDelete) return;

        try {

            await deleteDepartment(id);

            alert("Department Deleted");

            loadDepartments();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <Layout>

            <PageHeader

                title="Departments"

                subtitle="Manage all departments"

            />

            <DepartmentToolbar

                search={search}

                setSearch={setSearch}

                onAddDepartment={openAddModal}

            />

            <DepartmentTable

                departments={currentDepartments}

                onEdit={openEditModal}

                onDelete={handleDelete}

            />

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                setCurrentPage={setCurrentPage}

            />

            <DepartmentModal

                show={showModal}

                department={selectedDepartment}

                onClose={closeModal}

            />

        </Layout>

    );

}

export default Departments;