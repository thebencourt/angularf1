'use strict';
/* global angular:false */

angular.module('angularF1app.services', [])
    .factory('ergastAPIservice', function ($http) {

        var ergastAPI = {};

        ergastAPI.listSeasons = function () {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/seasons.json?limit=90&callback=JSON_CALLBACK'
            });
        };

        ergastAPI.getDrivers = function (season) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/' + season + '/driverStandings.json?callback=JSON_CALLBACK'
            });
        };

        ergastAPI.getTeams = function (season) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/' + season + '/constructorStandings.json?callback=JSON_CALLBACK'
            });
        };

        ergastAPI.getDriverRaces = function (season, id) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/' + season + '/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
            });
        };

        ergastAPI.getTeamInfo = function (id, season) {
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/' + season + '/'
            });
        };

        return ergastAPI;
    });
