var apiKey = "f9ec1f1628b2797228338215c5a13f3d";
var storedHistory = [];

//adds the old city to the buttons and stores them in
function searchHistory(cityname){
    var saveCity = cityname;
    storedHistory.push(saveCity);

    //creates button for old city
    var pastSearch = $("<button>").text(cityname);
    pastSearch.addClass("oldSearches");

    pastSearch.attr('id', 'historyBtn');

    //adds button to the div
    $(".pastCity").prepend(pastSearch);
    $("#historyBtn").on("click", function(event){
        event.preventDefault();
        console.log("what is the town places",pastSearch.text());
        console.log ("you clicked", pastSearch.text());
        clearDiv();
        displaydaily(pastSearch.text());
    })
    saveData();
    
}

//saves the data of the buttons in order to be loaded later
function saveData(){
    var cityPast = storedHistory;
    localStorage.setItem("cities", JSON.stringify(cityPast));
}

//displays last saved button and loads last search 
function displaySave(){

    let saveCities = JSON.parse(localStorage.getItem("cities"));
    // var lastCityIndex = saveCities.length - 1

    if (saveCities != null && saveCities.length > 0){

        var lastCityIndex = saveCities.length - 1
        for (i4 = 0; i4 < saveCities.length ; i4++){
         searchHistory(saveCities[i4])
        }
        displaydaily(saveCities[lastCityIndex]);

    }else{
        clearcity = [];
        localStorage.setItem("cities", JSON.stringify(clearcity));
    }
}

//gets the UVDATA using lat and longitute
function uVData(latitude, longitude){

    var uvUrL = "https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;

 // Creating an AJAX call for the specific movie button being clicked
 $.ajax({
    url: uvUrL,
    method: "GET"
    }).then(function(response) {
        var uvIndex = parseInt(response["value"]);
        var whatUv = $("<p>");
        var pFour = whatUv.text("UV Index: " + uvIndex);

        if (uvIndex >= 11) {
            whatUv.addClass("extreme");
        } 
        else if(uvIndex <= 11 && uvIndex >=8){
            whatUv.addClass("very-High");
        }
        else if(uvIndex <= 7 && uvIndex >= 6){
            whatUv.addClass("high");
        }
        else if(uvIndex <= 5 && uvIndex >= 3){
            whatUv.addClass("moderate");
        }
        else{
            whatUv.addClass("low");
        }
        $("#displayInfo").append(pFour);

    });
}

//clears local storage
function ClearHistory(){

    $("#clearHist").click(function() {
        console.log("button in clear");
        $(".pastCity").empty();

        //by loading a empty list it prevents breaks of the code
        var cityClear = []
        localStorage.setItem("cities", JSON.stringify(cityClear));
    });
}

//clear divs
function clearDiv(){
    $(".dailyTitle").empty();
    $("#nameOfCity").empty();
    $("#todayDate").empty();
    $("#icon").empty();
    $("#displayInfo").empty();
    $("#fivedayTitle").empty();
    $(".wordsTitle").empty();
    $("#day1cast").empty();
    $("#day2cast").empty();
    $("#day3cast").empty();
    $("#day4cast").empty();
    $("#day5cast").empty();
}

//Gets the five day forecast
function fiveDay(latitude,longitude,todaydate){
    
    $(".fiveDay").addClass("borderFive");
    var whatTitle = $("<p>").attr('id', 'fivedayTitle');
    var pForTitle = whatTitle.text("5-DAY Forecast");
    $(".fiveDay").prepend(pForTitle);
    var dateVar = todaydate;
    var fiveURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=current+minutely,hourly,"+"&appid="+apiKey+"&units=imperial";
   
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: fiveURL,
    method: "GET"
    }).then(function(response) {
        
        var whatTitleFor = $("<p>")
        $(whatTitleFor).html("date"+1)

        //get the 5 day forecast
        for(i = 1; i < 6; i++) {
            //getting date var
            var dateForecast = (parseInt(dateVar[2]))+i;
            
            var pDate = $("<p>");
            var whatDateForecast = pDate.html(dateVar[1]+ "/" + dateForecast + "/" + dateVar[0]);
            pDate.addClass("dateForecast");

            $("#day"+i+"cast").append(whatDateForecast);
            $("#day"+i+"cast").addClass("forecast")

            //get the icon 
            var iconcode = response["daily"][i]["weather"][0]["icon"];
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
            $("#day"+i+"cast").append('<img id="weatherImage2"' + "src="+ iconurl + ' />');
            
            //get the temperature
            var temperaturefor = (response["daily"][i]["temp"]["day"]);
            var whatTempfor = $("<p>");
            var pForOne = whatTempfor.text("Temp: " + temperaturefor + " F");
            $("#day"+i+"cast").append(pForOne);

            //finds and adds humidity
            var humidityFor = (response["daily"][i]["humidity"]);
            var whatHumFor = $("<p>");
            var pForTwo = whatHumFor.text("Humidity: " + humidityFor + "%");
            $("#day"+i+"cast").append(pForTwo);

            //add class for the forecast boxes
            $("#day"+i+"cast").addClass("forcast")

        }
        
    });
       
}

//display Daily Block
function displaydaily(cityname) {
    // clearDiv();
    
    $(".displayDashboard").addClass("borderDaily")
    // $(".dailyTitle").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+apiKey+"&units=imperial";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        //title of the city and weather icon
        var whatCity = response["city"]["name"];
        $("#nameOfCity").append(whatCity);

        //finding date for today
        var whatDateTime = response["list"][0]["dt_txt"];
        var whatDateWhole = whatDateTime.split(" ");
        var whatDateSplit = whatDateWhole[0].split("-");
        var whatDate = "(" + whatDateSplit[1]+ "/" + whatDateSplit[2] + "/" + whatDateSplit[0] + ")";
        $("#todayDate").append(whatDate);

        //Adding in ICON To the event 
        var iconcode = response["list"][0]["weather"][0]["icon"]
        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        $("#icon").append('<img id="weatherImage"' + "src="+ iconurl + ' />');
        
        // Creating an element to have the temperature displayed
        var temperature = (response["list"][0]["main"]["temp"]);
        var whatTemp = $("<p>");
        // var degree = $("<sup>")

        var pOne = whatTemp.text("Temperature: " + temperature + "F");
        $("#displayInfo").append(pOne);

        //finds and adds humidity
        var humidity = (response["list"][0]["main"]["humidity"]);
        var whatHum = $("<p>");
        var pTwo = whatHum.text("Humidity: " + humidity + "%");
        $("#displayInfo").append(pTwo);

        //find and add wind speed 
        var windSpeed = (response["list"][0]["wind"]["speed"]);
        var whatSpeed = $("<p>");
        var pThree = whatSpeed.text("WindSpeed: " + windSpeed + "MPH");
        $("#displayInfo").append(pThree);

        //finds and adds UV Index 
        var latiCo = (response["city"]["coord"]["lat"]);
        var longCo = (response["city"]["coord"]["lon"]);
        uVData(latiCo,longCo);
        
        // var cityId = (response["city"]["id"]);
        fiveDay(latiCo,longCo,whatDateSplit);

    });

}


function main(){
   
    displaySave();
    ClearHistory()

    $("#searchBtn").on("click", function (event) {
        $(document).ready();
        event.preventDefault();
        clearDiv();
        var citySearch = $("#cityInput").val();
        
        
        // saves Data
        searchHistory(citySearch);
        displaydaily(citySearch);
    
    })

}

//calls main
main();



