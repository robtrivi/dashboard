const API_KEY = 'c09b68acdaabbcd80f644db612532df4';

export const fetchWeatherData = async (city: string): Promise<Document> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&mode=xml`);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    return xml;
};