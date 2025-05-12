import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Kurye simgesi (basit turuncu simge)
const courierIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
    iconSize: [32, 32],
});

const MapSection = () => {
    const [position, setPosition] = useState([41.6344, 32.3379]); // Bartın konumu
    const [courierCalled, setCourierCalled] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
        });
    }, []);

    const handleCourierCall = () => {
        setCourierCalled(true);
    };

    return (
        <div style={{ height: "400px", marginTop: "20px" }}>
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap katkıda bulunanlar"
                />


                {/* Kullanıcının konumu */}
                <Marker position={position}>
                    <Popup>Senin konumun</Popup>
                </Marker>

                {/* Kurye gösterimi */}
                {courierCalled && (
                    <Marker position={[position[0] + 0.002, position[1] + 0.002]} icon={courierIcon}>
                        <Popup>Kurye geliyor!</Popup>
                    </Marker>
                )}
            </MapContainer>

            <button onClick={handleCourierCall} style={{ marginTop: "10px" }}>
                Kurye Çağır
            </button>
        </div>
    );
};

export default MapSection;
