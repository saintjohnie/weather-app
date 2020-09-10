
const point = document.querySelector("#search");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const wind = document.querySelector("#wind");
const country = document.querySelector("#country");
const place = document.querySelector("#place");
const humidity = document.querySelector("#humidity");
const search = document.querySelector("#btn");
const weatherImg = document.querySelector("#weather-icon");
const cardImg = document.querySelector(".card-img");

const city = point.value;
const api = "001b0f58045147663b1ea518d34d88b4";
const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;


function SetUpAssets() { }

SetUpAssets();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

function PersistToStorage(datas) {
  localStorage.setObj("weather_data", datas);
}

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

let datas = localStorage.getObj("weather_data") || [];

if (datas.length) {
  PopulateUI(datas[datas.length - 1]);
}

search.addEventListener("click", async (e) => {
  const city = point.value;

  e.preventDefault();
  let resp = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=metric&appid=cf8393352b77c60595843a81052e94cc`
  );
  if (resp.ok) {
    let response = await resp.json();

    const data = {
      temp: Math.round(response.main.temp),
      desc: response.weather[0].description,
      img: response.weather[0].main,
      wind: response.wind.speed,
      humidity: response.main.temp,
      place: response.name,
      country: response.sys.country,
    };

    datas.push(data);

    PopulateUI(data);

    PersistToStorage(datas);
    point.value=""
  }


});
function PopulateUI(data) {
  temp.innerHTML = data.temp + "&#8451";
  desc.innerHTML = data.desc;
  wind.innerHTML = data.wind + "km/hr";
  humidity.innerHTML = data.humidity + "%";
  place.innerHTML = data.place + ", " + data.country;
  weatherImg.src = `images/${data.img}.png`;
  weatherImg.alt = data.img;
}

