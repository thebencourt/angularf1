'use strict';
/* global angular:false */

var year = new Date().getFullYear();

angular.module('angularF1app', [
    'angularF1app.controllers',
    'angularF1app.services',
    'ngRoute'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/:season/', {
            templateUrl: 'partials/season.html',
            controller: 'seasonController'
        })
        .when('/:season/drivers/:id', {
            templateUrl: 'partials/driver.html',
            controller: 'driverController'
        })
        .otherwise({
            redirectTo: '/' + year
        });
}]);
