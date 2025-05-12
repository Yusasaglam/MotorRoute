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
    const [position, setPosition] = useState(null);
    const [courierCalled, setCourierCalled] = useState(false);
    const [mapInstance, setMapInstance] = useState(null); // Harita instance'ı için state
    const [courierMarker, setCourierMarker] = useState(null); // Kurye marker'ı için state

    // Konum alma işlemi
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                },
                (err) => {
                    console.error('Konum alınamadı:', err.message);
                    setPosition([41.6344, 32.3379]); // Fallback konum
                }
            );
        } else {
            alert('Tarayıcınız konum desteği sunmuyor!');
        }
    }, []);

    // Harita ve marker ekleme işlemi
    useEffect(() => {
        if (position && !mapInstance) {
            const map = L.map('map').setView(position, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            // Kullanıcı marker'ı
            L.marker(position).addTo(map)
                .bindPopup('Buradasınız!')
                .openPopup();

            setMapInstance(map); // Harita instance'ını state'e kaydet

            // Kurye çağrılınca marker ekle
            if (courierCalled) {
                const courier = L.marker([position[0] + 0.002, position[1] + 0.002], {
                    icon: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
                        iconSize: [32, 32],
                    }),
                }).addTo(map)
                    .bindPopup('Kurye geliyor!')
                    .openPopup();
                setCourierMarker(courier); // Kurye marker'ını state'e kaydet
            }
        }

        // Harita ve kurye marker'ı güncelleme işlemi
        if (courierCalled && mapInstance && courierMarker) {
            // Eğer kurye çağrıldıysa, eski marker'ı kaldır
            courierMarker.remove();
            // Yeni marker'ı ekle
            const newCourierMarker = L.marker([position[0] + 0.002, position[1] + 0.002], {
                icon: L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
                    iconSize: [32, 32],
                }),
            }).addTo(mapInstance)
                .bindPopup('Kurye geliyor!')
                .openPopup();
            setCourierMarker(newCourierMarker); // Yeni marker'ı state'e kaydet
        }
    }, [position, courierCalled, mapInstance]); // Bu değişkenler değiştiğinde yeniden çalışacak

    const handleCourierCall = () => {
        setCourierCalled(true); // Kurye çağrıldı, marker eklenecek
    };

    return (
        <div>
            <h2>Harita</h2>

            {!position ? (
                <p>Konum alınıyor...</p>
            ) : (
                <>
                    <div id="map" style={{ height: '400px' }}></div>
                    <button onClick={handleCourierCall} style={{ marginTop: '10px' }}>
                        Kurye Çağır
                    </button>
                </>
            )}
        </div>
    );
};

export default MapSection;
