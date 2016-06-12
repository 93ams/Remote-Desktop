'use strict';

var app = app || {};

app.controller('MusicCtrl', ['$scope', '$http', MusicCtrl]);

function MusicCtrl($scope, $http) {
    $scope.bands = [];

    $scope.getBands = function(){
        $http.get( "/music/bands" )
        .then(function(res) {
            console.log(res.data);
            $scope.bands = res.data;
        }, function errorCallback(res) { console.log("error"); });
    }

    $scope.getBand = function(band){

    }

    $scope.getAlbum = function(band,album){

    }

    $scope.getSong = function(band,album,song){
        console.log(band + "/" + album + "/" + song);
    }

    $scope.getBands();
}
