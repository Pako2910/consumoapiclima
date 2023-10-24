let currentWeather = {
    weather_apiKey: "b5af752f9ec804ace97776aa558f0ef3",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.weather_apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    //WEATHER
    displayWeather: function(data) {
        console.log(data);
        const {name} = data;
        const {temp} = data.main;
        const {temp_min, temp_max} = data.main;
        const {description} = data.weather[0];

    //HTML
        document.querySelector(".city").innerHTML = name.toUpperCase(2);
        document.querySelector(".temp").innerHTML =  Math.round(temp) + " °C";
        document.querySelector(".description").innerHTML = description;
    },
    
    //5 DAYS FORECAST
    forecast_apiKey: "vjGjwTn3T55EcGJt3Q7DaLJ9oe0oIBAe",

    fetchForecast: function(city) {
        var location_key;
        const loc_key_url = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="
        +this.forecast_apiKey+
        "&q=" 
        + city;
        fetch(loc_key_url).then((response) => response.json()).then( (data) => 
        fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+data[0].Key +"?apikey=" + this.forecast_apiKey+"&metric=true")
        .then((response) => response.json()).then((data) => this.displayForecast(data)));
    },    

    displayForecast : function(data) {
        const {DailyForecasts} = data;
        console.log(DailyForecasts);
        
        //DATE
        const allftop = document.querySelectorAll(".date");
        let i = 0;
        for (const element of allftop) {
            const d = DailyForecasts[i].Date;
            const date = new Date(d);
            const f = new Intl.DateTimeFormat("es-mx", {
                dateStyle: "full"
            });
            element.innerHTML = f.format(date);
            i++;
        }

        //MIN_TEMP / MAX_TEMP
        const allftemp = document.querySelectorAll(".ftemp");
        i = 0;
        for (const element of allftemp) {
            const {Date} = DailyForecasts[i];
            const temp_max = DailyForecasts[i].Temperature.Maximum.Value; 
            const temp_min = DailyForecasts[i].Temperature.Minimum.Value; 
            element.innerHTML = Math.round(temp_min)+" °C"+" / "+Math.round(temp_max)+" °C";
            i++;
        }
        
        //DAY DESCRIPTION
        const alldaydescription = document.querySelectorAll(".fday-description");
        i = 0;
        for(const element of alldaydescription) {
            const{IconPhrase} = DailyForecasts[i].Day;
            element.innerHTML = `<p style="font-size:1.2em">${IconPhrase}</p>`;
            i++;
        }
        //NIGHT DESCRIPTION
        const allnightdescription = document.querySelectorAll(".fnight-description");
        i = 0;
        for(const element of allnightdescription) {
            const{IconPhrase} = DailyForecasts[i].Night;
            element.innerHTML = `<p style="font-size:1.2em">${IconPhrase}</p>`;
            i++;
        }
    },

    search: function() {
        let city = document.querySelector(".search-input").value;
        this.fetchWeather(city);
        this.fetchForecast(city);
        console.log(city);
    }
}

document.querySelector(".search-input").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        currentWeather.search();
    } 
})
document.querySelector(".search-button").addEventListener("click", function() {
    currentWeather.search();
})

// DEFAULT CITYp+´´´´´´´´´´´´´+++k
currentWeather.fetchWeather("Ciudad del Carmen");
currentWeather.fetchForecast("Ciudad del Carmen");