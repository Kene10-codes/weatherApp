const result = document.querySelector(".result");
const searchBtn = document.querySelector(".search-btn");
const cityRef = document.querySelector(".searchInput");

function ShowWeather() {
  let cityName = cityRef.value;
  // validate if input is empty
  if (cityName.length == 0) {
    result.innerHTML = `<h3 class="error">The Input Field cannot be empty</h3>`;
  } else {
    let APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    result.innerHTML = `<h3 class="loading">The city info is laoding...</h3>`;

    // Clear the input value
    cityRef.value = "";
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather"> ${data.weather[0].main}</h4>
        <h4 class="description"> ${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
         <div>
          <h4 class="title">Min</h4>
          <h4 class="temp">${data.main.temp_min}</h4>
         </div>
         <div>
          <h4 class="title">Max</h4>
          <h4 class="temp">${data.main.temp_max}</h4>
         </div>
        </div>
         
         `;
      })

      // Error if API call uncessful
      .catch((err) => {
        result.innerHTML = `<h3 class="error">City Not Found</h3>`;
      });
  }
}

// Load event
searchBtn.addEventListener("click", ShowWeather);
