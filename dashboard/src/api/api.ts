const API_KEY = 'c09b68acdaabbcd80f644db612532df4';

export const fetchWeatherData = async (city: string): Promise<Document> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&mode=xml`);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${city}: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    return xml;
};

export const getWeatherData = async (city: string) => {
    const now = new Date().getTime();
    const localStorageKey = `weatherData_${city}`;
    const cachedData = localStorage.getItem(localStorageKey);
    const cachedTime = localStorage.getItem(`${localStorageKey}_time`);

    if (cachedData && cachedTime && now - parseInt(cachedTime) < 3600000) { // 1 hour in milliseconds
        const parser = new DOMParser();
        return parser.parseFromString(cachedData, "application/xml");
    } else {
        const data = await fetchWeatherData(city);
        const serializer = new XMLSerializer();
        localStorage.setItem(localStorageKey, serializer.serializeToString(data));
        localStorage.setItem(`${localStorageKey}_time`, now.toString());
        return data;
    }
};

export const fetchCoordinates = async (city: string): Promise<{ lat: number, lon: number }> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch coordinates for ${city}: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.coord) {
        throw new Error(`No coordinates found for ${city}`);
    }
    const { coord: { lat, lon } } = data;
    return { lat, lon };
};

export const fetchHistoricalWeatherData = async (lat: number, lon: number, start: string, end: string): Promise<any> => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&temperature_unit=celsius&daily=temperature_2m_mean&timezone=UTC`);
    if (!response.ok) {
        throw new Error(`Failed to fetch historical weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};