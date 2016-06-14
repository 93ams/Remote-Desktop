'use strict';

var app = app || {};

const login = function(){
    return {
        restrict: 'E',
        scope: {
            user: "="
        },
        templateUrl: "/js/directives/templates/login.html",
        replace: true,
        controller: LoginCtrl
    }
}

app.directive("login", login);
