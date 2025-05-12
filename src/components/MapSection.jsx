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
    // Başlangıç konumu (Bartın Merkez örneği)
    const [position, setPosition] = useState([41.6344, 32.3379]);

    useEffect(() => {
        const map = L.map('map').setView(position, 13); // Başlangıçta haritayı konumla aç

        // Harita görsellerini yükle
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Marker ekle
        const marker = L.marker(position).addTo(map)
            .bindPopup('Buradasınız!')
            .openPopup();

        // Eğer konum değişirse marker'ı güncelle
        map.on('moveend', () => {
            const newPosition = map.getCenter(); // Yeni konum bilgisi
            setPosition([newPosition.lat, newPosition.lng]); // State güncelle
        });

        return () => {
            map.remove(); // Component unmount olunca haritayı kaldır
        };
    }, [position]); // 'position' değiştiğinde haritayı yeniden render et

    return (
        <div>
            <h2>Harita</h2>
            <div id="map" style={{ height: '400px' }}></div>
            <p>Konum: {position[0]}, {position[1]}</p>
        </div>
    );
};

export default MapSection;
