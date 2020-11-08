window.addEventListener('load', () => {
    let year = document.querySelector('.year');
    let mounth = document.querySelector('.mounth');
    let day = document.querySelector('.day');
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationCity = document.querySelector('.location-city');
    let degreeCity = document.querySelector('.degree');

    const today = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    year.textContent = today.getFullYear();
    mounth.textContent = months[today.getMonth()];
    day.textContent = today.getDate();

    //Weather
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=baac2898afeb9960766640be5bd70320`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const description = data.weather[0].description;
                    const location = data.name;
                    const degree = data.main.temp - 273.15;
                    const degree_round = Math.round(degree);

                    //Set DOM elements from the API
                    temperatureDescription.textContent = description;
                    locationCity.textContent = location;
                    degreeCity.textContent = degree_round + '°C';
                })
        });
    }
});