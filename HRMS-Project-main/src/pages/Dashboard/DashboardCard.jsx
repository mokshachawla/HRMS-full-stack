function DashboardCard({ title, value, icon, color }) {
    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: "220px",
                textAlign: "center",
                borderLeft: color ? `5px solid ${color}` : "5px solid #0d6efd"
            }}
        >
            {icon && (
                <div
                    style={{
                        fontSize: "28px",
                        marginBottom: "10px",
                        color: color || "#0d6efd"
                    }}
                >
                    {icon}
                </div>
            )}

            <h5>{title}</h5>

            <h2>{value}</h2>
        </div>
    );
}

export default DashboardCard;