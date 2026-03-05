const API_KEY = '903410e6d87da3f2012283fb9b2e44a1';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weather-display');

async function getWeather(city) {
    try {
        showLoading();
        toggleButton(true);

        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        console.log('Weather Data:', data);

        displayWeather(data);

    } catch (error) {
        console.error('Error fetching weather:', error);

        if (error.response && error.response.status === 404) {
            showError('City not found. Please check the spelling and try again.');
        } else {
            showError('Something went wrong. Please try again later.');
        }

    } finally {
        toggleButton(false);
    }
}

function displayWeather(data) {

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;

    weatherDisplay.innerHTML = weatherHTML;
}

function showError(message) {
    weatherDisplay.innerHTML = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
}

function showLoading() {
    weatherDisplay.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Fetching weather data...</p>
        </div>
    `;
}

function toggleButton(state) {
    searchBtn.disabled = state;
}

searchBtn.addEventListener('click', () => {

    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name.');
        cityInput.focus();
        return;
    }

    getWeather(city);

    cityInput.value = '';
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

weatherDisplay.innerHTML = `
    <p>Welcome! Enter a city name to get started.</p>
`;