'use strict';

var app = app || {};

function NavCtrl($scope, $state) {
    var states = $state.get();
    $scope.divs = states.slice(2, states.length);

    $scope.user = null;
}

app.controller('NavCtrl', ["$scope", "$state", NavCtrl]);
