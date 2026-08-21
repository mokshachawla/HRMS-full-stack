import { useEffect, useState } from "react";
import AssetTypeStats from "../../components/Dashboard/AssetTypeStats";
import { toast } from "react-toastify";

import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/Common/PageHeader";
import Pagination from "../../components/Common/Pagination";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import AssetTypeTable from "../../components/AssetType/AssetTypeTable";
import AssetTypeToolbar from "../../components/AssetType/AssetTypeToolbar";
import AssetTypeModal from "../../components/AssetType/AssetTypeModal";

import {
    getAssetTypes,
    deleteAssetType
} from "../../services/assetTypeService";

function AssetTypes() {

    // ==========================
    // State
    // ==========================

    const [assetTypes, setAssetTypes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("nameAsc");

    const [currentPage, setCurrentPage] = useState(1);

    const assetTypesPerPage = 5;

    const [showModal, setShowModal] = useState(false);

    const [selectedAssetType, setSelectedAssetType] = useState(null);


    useEffect(() => {

        loadAssetTypes();

    }, []);

    const loadAssetTypes = async () => {

        try {

            setLoading(true);

            const response = await getAssetTypes();

            setAssetTypes(response.data);

        }

        catch (error) {

            console.error("Failed to load Asset Types", error);

        }

        finally {

            setLoading(false);

        }

    };


    const filteredAssetTypes = assetTypes.filter((assetType) =>

        assetType.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    const sortedAssetTypes = [...filteredAssetTypes];

    switch (sortBy) {

        case "nameAsc":

            sortedAssetTypes.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            break;

        case "nameDesc":

            sortedAssetTypes.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

            break;

        default:

            break;

    }


    const indexOfLast =
        currentPage * assetTypesPerPage;

    const indexOfFirst =
        indexOfLast - assetTypesPerPage;

    const currentAssetTypes =
        sortedAssetTypes.slice(
            indexOfFirst,
            indexOfLast
        );

    const totalPages =
        Math.ceil(
            sortedAssetTypes.length /
            assetTypesPerPage
        );

    useEffect(() => {

        setCurrentPage(1);

    }, [search, sortBy]);

    // ==========================
    // Modal
    // ==========================

    const openAddModal = () => {

        setSelectedAssetType(null);

        setShowModal(true);

    };

    const openEditModal = (assetType) => {

        setSelectedAssetType(assetType);

        setShowModal(true);

    };

    const closeModal = async () => {

        setShowModal(false);

        setSelectedAssetType(null);

        await loadAssetTypes();

    };

    // ==========================
    // Delete
    // ==========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this Asset Type?"
        );

        if (!confirmDelete) return;

        try {

            await deleteAssetType(id);

            toast.success("Asset Type Deleted Successfully!");

            await loadAssetTypes();

        }

        catch (error) {

            console.error(error);

            toast.error("Delete Failed!");

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return <LoadingSpinner />;

    }

    // ==========================
    // UI
    // ==========================

    return (

        <Layout>

            <PageHeader
                title="Asset Types"
                subtitle="Manage all asset types"
            />

            <AssetTypeToolbar

                search={search}

                setSearch={setSearch}

                sortBy={sortBy}

                setSortBy={setSortBy}

                onAddAssetType={openAddModal}

            />

            <AssetTypeTable

                assetTypes={currentAssetTypes}

                onEdit={openEditModal}

                onDelete={handleDelete}

            />

            <Pagination

                currentPage={currentPage}

                totalPages={totalPages}

                setCurrentPage={setCurrentPage}

            />

            <AssetTypeModal

                show={showModal}

                assetType={selectedAssetType}

                onClose={closeModal}

            />

        </Layout>

    );

}

export default AssetTypes;