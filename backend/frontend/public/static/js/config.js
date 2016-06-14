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
        }).state('app.files', {
            url:'/files',
            data: { name: "Files" },
            views: {
                'content@': {
                    templateUrl : '/js/views/files.html',
                    controller  : 'FilesCtrl'
                }
            }
        }).state('app.music', {
            url:'/music',
            data: { name: "Music" },
            views: {
                'content@': {
                    templateUrl : '/js/views/music.html',
                    controller: 'MusicCtrl'
                }
            }
        }).state('app.movies', {
            url:'/movies',
            data: { name: "Movies" },
            views: {
                'content@': {
                    templateUrl : '/js/views/movies.html'
                }
            }
        }).state('app.books', {
            url:'/books',
            data: { name: "Books" },
            views: {
                'content@': {
                    templateUrl : '/js/views/books.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
