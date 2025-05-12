import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Leaflet CSS importu
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Marker ikonlarını tanımla
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapSection = () => {
    const [position, setPosition] = useState([41.6344, 32.3379]);  // Bartın Merkez Örnek Konum

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
        </div>
    );
};

export default MapSection;
