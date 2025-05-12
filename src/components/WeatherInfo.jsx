import { useEffect, useState } from "react";

const WeatherInfo = () => {
    const [weather, setWeather] = useState(null);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude });
        });
    }, []);

    useEffect(() => {
        if (!coords) return;

        const fetchWeather = async () => {
            const apiKey = "1aec458ad919cbc6802e9b6c44b7a21c";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric&lang=tr`;

            const response = await fetch(url);
            const data = await response.json();
            setWeather(data);
        };

        fetchWeather();
    }, [coords]);

    if (!weather) return <p>Hava durumu yükleniyor...</p>;

    return (
        <div>
            <h3>Hava Durumu</h3>
            <p>{weather.name} - {weather.weather[0].description}, {weather.main.temp}°C</p>
        </div>
    );
};

export default WeatherInfo;
