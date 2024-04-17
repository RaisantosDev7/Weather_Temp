const apikey = "2769ba9127f32fbf39ab05ec4b7edfb1";
const apiCountyUrl = "https://flagcdn.com/16x12/ua.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatheIconeElment = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElemet = document.querySelector("#wind span");

const weatherContainer = document.querySelector(".hide")

//functios

const getWeatherData = async (city) => {


    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherUrl);
    const data = await res.json();
    
    return data;
};


const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    umidityElement.innerText = `${data.main.humidity}%`;
    windElemet.innerText = `${parseInt(data.wind.speed)}km/h`;

    const country = data.sys.country;

    weatheIconeElment.setAttribute  (
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
)

    countryElement.setAttribute (
        "src", `https://flagsapi.com/${country}/flat/64.png`)

        weatherContainer.classList.remove("hide")
    
};

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const city = cityInput.value;
        
        showWeatherData(city)
    });


    cityInput.addEventListener("keyup", (e) => {

            if (e.code === "Enter") {
                const city = e.target.value;
                showWeatherData(city)
            }
    }) 