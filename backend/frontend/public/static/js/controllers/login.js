'use strict';

var app = app || {};

function LoginCtrl($scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.logged = false;

    const validate = function(){
        if($scope.username && $scope.password){
            return true
        }
    }

    $scope.login = function() {
        if(validate()){
            $scope.user = {
                username: $scope.username
            }
            $scope.logged = true;
            //colapse dropdown
        }
    }

    $scope.logout = function() {
        $scope.user = null;
        $scope.logged = false;
    }
}

app.controller('LoginCtrl', ["$scope", LoginCtrl]);
