import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapSection = () => {
    const [position, setPosition] = useState([41.6344, 32.3379]);

    // 🛰 Konumu Al
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    alert(`Konum alındı: ${latitude}, ${longitude}`);
                },
                (err) => {
                    alert(`Konum alınamadı: ${err.message}`);
                    console.error("Hata:", err);
                }
            );
        } else {
            alert("Tarayıcın konum desteği sunmuyor.");
        }
    }, []);

    // 🗺 Haritayı kur
    useEffect(() => {
        const map = L.map('map').setView(position, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        L.marker(position).addTo(map)
            .bindPopup('Buradasınız!')
            .openPopup();
    }, [position]);

    return (
        <div>
            <h2>Harita</h2>
            <div id="map" style={{ height: '400px' }}></div>
            <button onClick={() => alert("Kurye çağrıldı!")} style={{ marginTop: "10px" }}>
                Kurye Çağır
            </button>
        </div>
    );
};

export default MapSection;
