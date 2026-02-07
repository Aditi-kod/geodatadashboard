import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ rows, selectedId, onSelect }) => {
    const selectedRow = rows.find((r) => r.id === selectedId);

    return (
        <MapContainer center={[20, 78]} zoom={5} row={selectedRow} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true} />

            {rows.map((row) => (
                <Marker
                    key={row.id}
                    position={[row.latitude, row.longitude]}
                    eventHandlers={{
                        click: () => onSelect(row.id),
                    }}
                >
                    <Popup>
                        <strong>{row.projectName}</strong>
                        <br />
                        Status: {row.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
