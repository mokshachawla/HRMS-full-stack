import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";
import DashboardCard from "../../components/Dashboard/DashboardCard";

import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

import {
    FaUsers,
    FaBuilding,
    FaLaptop,
    FaClipboardList,
    FaMoneyBill,
    FaCalendarAlt
} from "react-icons/fa";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Declare first
    const loadDashboard = async () => {

        try {

            const employeeResponse = await getEmployees();
            const departmentResponse = await getDepartments();

            const employeeData =
                employeeResponse.data.content || employeeResponse.data;

            const departmentData =
                departmentResponse.data.content || departmentResponse.data;

            setEmployees(Array.isArray(employeeData) ? employeeData : []);
            setDepartments(Array.isArray(departmentData) ? departmentData : []);

        } catch (error) {

            console.error("Failed to load dashboard", error);

            setEmployees([]);
            setDepartments([]);

        }
    };

    // Use after declaration
    useEffect(() => {
        loadDashboard();
    }, []);

    const totalEmployees = employees.length;

    const totalDepartments = departments.length;

    const highestSalary =
        employees.length > 0
            ? Math.max(...employees.map(employee => Number(employee.salary || 0)))
            : 0;

    const lowestSalary =
        employees.length > 0
            ? Math.min(...employees.map(employee => Number(employee.salary || 0)))
            : 0;

    const averageSalary =
        employees.length > 0
            ? employees.reduce(
            (sum, employee) => sum + Number(employee.salary || 0),
            0
        ) / employees.length
            : 0;

    const activeEmployees =
        employees.filter(employee => employee.active !== false).length;

    return (
        <Layout>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome to HRMS"
            />

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px"
                }}
            >

                <DashboardCard
                    title="Employees"
                    value={totalEmployees}
                    icon={<FaUsers />}
                    color="#0d6efd"
                />

                <DashboardCard
                    title="Departments"
                    value={totalDepartments}
                    icon={<FaBuilding />}
                    color="#198754"
                />

                <DashboardCard
                    title="Highest Salary"
                    value={`₹ ${highestSalary.toLocaleString("en-IN")}`}
                    icon={<FaLaptop />}
                    color="#ffc107"
                />

                <DashboardCard
                    title="Lowest Salary"
                    value={`₹ ${lowestSalary.toLocaleString("en-IN")}`}
                    icon={<FaClipboardList />}
                    color="#dc3545"
                />

                <DashboardCard
                    title="Average Salary"
                    value={`₹ ${Math.round(averageSalary).toLocaleString("en-IN")}`}
                    icon={<FaMoneyBill />}
                    color="#6610f2"
                />

                <DashboardCard
                    title="Active Employees"
                    value={activeEmployees}
                    icon={<FaCalendarAlt />}
                    color="#20c997"
                />

            </div>

        </Layout>
    );
}

export default Dashboard;