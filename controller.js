angular.module('weather-app').controller('weather-controller', function ($scope, $http, $interval) {

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

  function directTime() {
    var time = new Date();

    $scope.day = addZero(time.getDate());
    $scope.month = addZero(time.getMonth());
    $scope.year = time.getFullYear();
    $scope.hours = addZero(time.getHours());
    $scope.minutes = addZero(time.getMinutes());
  }

  $interval(directTime, 1000);

//localisation
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(myPosition);
  } else {
    console.log('Problem')
  }

//localisation with latitude & longitude
  function myPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

//connexion with the weather API & data recovery
    $http.get('https:lit-ridge-46374.herokuapp.com/forecast/a2e12f1f2fd8e8350976bececb546c6c/' + latitude + ',' + longitude + '?units=si')
    .then(function (response, error){
      if(response){
        console.log(response)
        $scope.apparentTemperature = response.data.currently.apparentTemperature;
        $scope.summary = response.data.currently.summary;
        $scope.temperatureHigh = response.data.daily.data[0].apparentTemperatureHigh;
        $scope.temperatureLow = response.data.daily.data[0].apparentTemperatureLow;
        $scope.humidity = response.data.currently.humidity;
        $scope.precipitation = response.data.currently.precipIntensity;
        $scope.windSpeed = response.data.currently.windSpeed;
        $scope.icon = response.data.currently.icon;
        $scope.eachHour = [];
        for (i=0; i<24; i++){
            $scope.eachHour[i] = response.data.hourly.data[i];
          }
      } else {
        console.log(error)
      };
    });
  };

  $http.get("https://ipinfo.io?token=9c6563290a7f05").then(function (response, err) {
    if(response){
      console.log(response);
      $scope.city = response.data.city
    } else {
      console.log(err)
    }
  });

});