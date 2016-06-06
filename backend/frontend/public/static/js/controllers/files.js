'use strict';

var app = app || {};

app.controller('FilesCtrl', ['$scope', '$http', FilesCtrl]);

function getBack(file){
    var path = file.split("/");
    path.pop();
    return path.join("/") || "/";
}

function FilesCtrl($scope, $http) {
    $scope.files = [];
    $scope.filesToUpload = [];
    $scope.currentPath = "/";
    $scope.clipboard = { file: null, mode: null };

    $scope.list = function(file){
        var path;
        if(file) { path = file.path + "/" + file.name }
        if(!file || file.isDirectory){
            $http.get( "/files",
                { params: { "path": path || "" } }
            ).then(function(response) {
                $scope.currentPath = path || "/";
                $scope.files = response.data.files;
            }, function errorCallback(response) {
                console.log("error");
            });
        }
    }

    $scope.get = function(file){

    }

    $scope.upload = function(){

    }

    $scope.delete = function(file){

    }

    $scope.rename = function(file){
        var new_name = prompt("Rename: ");
        if(new_name){


        }
    }

    $scope.copy = function(file){
        $scope.clipboard.file = file;
        $scope.clipboard.mode = "copy";
    }

    $scope.cut = function(file){
        $scope.clipboard.file = file;
        $scope.clipboard.mode = "cut";
    }

    $scope.paste = function(){
        switch($scope.clipboard.mode){
            case "copy":
                break;
            case "cut":
                break;
            default:
                break;
        }
    }

    $scope.back = function(){
        $scope.currentPath = getBack($scope.currentPath);
        if($scope.currentPath == "/"){ $scope.list(null); }
        else { $scope.list($scope.currentPath); }
    }

    $scope.list(null);
}
