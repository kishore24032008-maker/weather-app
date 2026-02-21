async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    resultDiv.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        loader.classList.add("hidden");

        if (data.error) {
            resultDiv.innerHTML = `<p style="color: #ffdddd;">${data.error}</p>`;
        } else {
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" class="weather-icon">
                <h3>${data.main.temp}°C</h3>
                <p>${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        }

    } catch (error) {
        loader.classList.add("hidden");
        resultDiv.innerHTML = "<p style='color: red;'>Something went wrong!</p>";
    }
}

// Press Enter to Search
document.getElementById("cityInput")
    .addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
});