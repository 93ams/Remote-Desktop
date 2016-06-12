'use strict';

var app = app || {};


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url:'/',
            views: {
                'navbar': {
                    templateUrl : '/js/views/navbar.html',
                    controller  : 'NavCtrl'
                },
                'content': {
                    templateUrl : '/js/views/home.html'
                },
                'footer': {
                    templateUrl : '/js/views/footer.html',
                }
            }
        }).state('app.music', {
            url:'/music',
            views: {
                'content@': {
                    templateUrl : '/js/views/music.html',
                    controller: 'MusicCtrl'
                }
            }
        }).state('app.movies', {
            url:'/movies',
            views: {
                'content@': {
                    templateUrl : '/js/views/movies.html'
                }
            }
        }).state('app.books', {
            url:'/books',
            views: {
                'content@': {
                    templateUrl : '/js/views/books.html'
                }
            }
        }).state('app.files', {
            url:'/files',
            views: {
                'content@': {
                    templateUrl : '/js/views/files.html',
                    controller  : 'FilesCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
