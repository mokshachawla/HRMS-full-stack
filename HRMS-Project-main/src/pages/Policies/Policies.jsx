import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";
import PolicyModal from "../../components/Policy/PolicyModal";
import PolicyTable from "../../components/Policy/PolicyTable";
import PolicyToolbar from "../../components/Policy/PolicyToolbar";
import PolicyStats from "../../components/Policy/PolicyStats";
import Pagination from "../../components/Common/Pagination";

import {
    getPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy
} from "../../services/policyService";

function Policies() {

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("titleAsc");

    const [showModal, setShowModal] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const policiesPerPage = 5;

    useEffect(() => {

        loadPolicies();

    }, []);

    const loadPolicies = async () => {

        try {

            setLoading(true);

            const response = await getPolicies();

            const data = response.data.content || response.data || [];

            setPolicies(Array.isArray(data) ? data : []);

        } catch (error) {

            console.error("Failed to load policies", error);

            setPolicies([]);

        } finally {

            setLoading(false);

        }

    };

    const filteredPolicies = policies.filter((policy) =>
        (policy.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const sortedPolicies = [...filteredPolicies];

    switch (sortBy) {

        case "titleAsc":

            sortedPolicies.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

            break;

        case "titleDesc":

            sortedPolicies.sort((a, b) =>
                b.title.localeCompare(a.title)
            );

            break;

        case "active":

            sortedPolicies.sort(
                (a, b) => Number(b.active) - Number(a.active)
            );

            break;

        case "inactive":

            sortedPolicies.sort(
                (a, b) => Number(a.active) - Number(b.active)
            );

            break;

        default:
            break;

    }

    useEffect(() => {

        setCurrentPage(1);

    }, [search, sortBy]);

    const indexOfLastPolicy = currentPage * policiesPerPage;

    const indexOfFirstPolicy =
        indexOfLastPolicy - policiesPerPage;

    const currentPolicies =
        sortedPolicies.slice(
            indexOfFirstPolicy,
            indexOfLastPolicy
        );

    const totalPages = Math.ceil(
        sortedPolicies.length / policiesPerPage
    );

    const handleEdit = (policy) => {

        setSelectedPolicy(policy);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this policy?"
        );

        if (!confirmDelete) return;

        try {

            await deletePolicy(id);

            await loadPolicies();

        } catch (error) {

            console.error(error);

            alert("Delete failed");

        }

    };

    const handleSavePolicy = async (policyData) => {

        try {

            if (selectedPolicy) {

                await updatePolicy(
                    selectedPolicy.id,
                    policyData
                );

            } else {

                await createPolicy(policyData);

            }

            await loadPolicies();

            setShowModal(false);

            setSelectedPolicy(null);

        } catch (error) {

            console.error(error);

            alert("Save failed");

        }

    };

    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedPolicy(null);

    };

    if (loading) {

        return <h3>Loading Policies...</h3>;

    }

    return (

        <Layout>

            <PageHeader
                title="Policies"
                subtitle="Manage all company policies"
            />

            <PolicyStats
                policies={policies}
            />

            <PolicyToolbar
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddPolicy={() => {

                    setSelectedPolicy(null);

                    setShowModal(true);

                }}
            />

            <PolicyTable
                policies={currentPolicies}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

            <PolicyModal
                show={showModal}
                policy={selectedPolicy}
                onClose={handleCloseModal}
                onSave={handleSavePolicy}
            />

        </Layout>

    );

}

export default Policies;
