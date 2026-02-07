import { useEffect, useState } from "react";
import { fetchGeoData } from "../api/geoApi";
import DataTable from "../components/DataTable/DataTable";
import MapView from "../components/MapView/MapView";

const Dashboard = () => {
    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchGeoData();

                setRows(
                    data.map((item, index) => ({
                        id: index + 1, // required by MUI DataGrid
                        projectName: item.projectName,
                        latitude: Number(item.latitude),
                        longitude: Number(item.longitude),
                        status: item.status,
                        lastUpdated: item.lastUpdated,
                    }))
                );
            } catch (error) {
                console.error("Failed to load geo data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                height: "100vh",
            }}
        >
            <DataTable
                rows={rows}
                loading={loading}
                selectedId={selectedId}
                onSelect={setSelectedId}
            />

            <MapView
                rows={rows}
                selectedId={selectedId}
                onSelect={setSelectedId}
            />
        </div>
    );
};

export default Dashboard;
