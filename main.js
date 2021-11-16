// variables
const city = document.querySelector(".city");
const icon = document.querySelector(".icon");
const description = document.querySelector(".description");
const template = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search button");

// fetch weather
let weatherFunc = {
  apiKey: "8a74c4e4accfe78b12c415e4825fe008",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
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

    city.innerText = `Weather name is ${name}`;
    icon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    description.innerText = description;
    temp.innerText = `${temp} °C`;
    humidity.innerText = `Humidity ${humidity} %`;
    wind.innerText = `Wind speed ${wind} km/h`;
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
searchButton.addEventListener("keyup", function (e) {
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
