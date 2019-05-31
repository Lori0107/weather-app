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
    console.log('pass here first');
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $http.get('httpss://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&APPID=d075bfff2f9c02161dc50bc3cd404842')
    .then(function (res, err) {
      if(res) {
        console.log(res)
        $scope.city = res.data.name;
        $scope.icon = res.data.weather[0].icon;
        $scope.apparentTemperature = res.data.main.temp;
        $scope.summary = res.data.weather[0].main;
        $scope.temperatureHigh = res.data.main.temp_max;
        $scope.temperatureLow = res.data.main.temp_min;
        $scope.humidity = res.data.main.humidity;
        $scope.windSpeed = res.data.wind.speed;
      } else {
        console.log(err)
      }
    });
  };
});
