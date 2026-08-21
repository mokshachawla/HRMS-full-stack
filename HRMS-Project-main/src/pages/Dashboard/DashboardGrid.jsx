import DashboardCard from "./DashboardCard";

function DashboardGrid({ children }) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px"
            }}
        >
            {children}
        </div>
    );
}

export default DashboardGrid;