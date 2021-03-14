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

//gets the UVDATA using lat and longituted
function uVData(latitude, longitude){

    var uvUrL = "https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;


