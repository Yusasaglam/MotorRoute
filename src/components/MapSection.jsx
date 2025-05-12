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
    // Konum başlangıçta boş (null) olacak
    const [position, setPosition] = useState(null);
    const [courierCalled, setCourierCalled] = useState(false);

    // Konum almayı dene
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]); // Konum alındı
                },
                (err) => {
                    console.error('Konum alınamadı:', err.message);
                    // Hata durumunda fallback konum (Bartın)
                    setPosition([41.6344, 32.3379]);
                }
            );
        } else {
            alert('Tarayıcınız konum desteği sunmuyor!');
        }
    }, []);

    // Harita oluşturma ve marker ekleme
    useEffect(() => {
        if (position) {
            const map = L.map('map').setView(position, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            // Kullanıcı konumu marker'ı
            L.marker(position).addTo(map)
                .bindPopup('Buradasınız!')
                .openPopup();

            // Kurye çağrıldığında marker ekleyelim
            if (courierCalled) {
                // Kurye marker'ı ekle (şu an biraz kaydırılmış)
                L.marker([position[0] + 0.002, position[1] + 0.002], {
                    icon: L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
                        iconSize: [32, 32],
                    })
                }).addTo(map)
                    .bindPopup('Kurye geliyor!')
                    .openPopup();
            }
        }
    }, [position, courierCalled]);

    // Kurye çağırma butonu
    const handleCourierCall = () => {
        setCourierCalled(true); // Kurye çağırıldı, marker eklenecek
    };

    return (
        <div>
            <h2>Harita</h2>

            {/* Konum alınana kadar bekle */}
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
