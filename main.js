// variables
const cityElement = document.querySelector(".city");
const iconElement = document.querySelector(".icon");
const descriptionElement = document.querySelector(".description");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search button");

// fetch weather
let weatherFunc = {
  apiKey: "8a74c4e4accfe78b12c415e4825fe008",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found!");
          throw new Error("Weather not found!");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWetaher(data);
      });
  },
  displayWetaher: function (data) {
    console.log(data);
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityElement.innerText = `Weather for ${name}`;
    iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
    descriptionElement.innerText = description;
    tempElement.innerText = `${temp} °C`;
    humidityElement.innerText = `Humidity ${humidity} %`;
    windElement.innerText = `Wind speed ${speed} km/h`;
    weather.classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name})`;
  },
  search: function () {
    this.fetchWeather(searchBar.value);
  },
};

// saerch button was clicked
searchButton.addEventListener("click", function () {
  weatherFunc.search();
  reset();
});

// was clicked enter in search input
searchBar.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    weatherFunc.search();
    reset();
  }
});

// reset
function reset() {
  searchBar.value = "";
}

// default
weatherFunc.fetchWeather("Qazax");
