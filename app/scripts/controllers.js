'use strict';
/* global angular:false */

angular.module('angularF1app.controllers', [])
    .controller('rootController', function ($scope, $routeParams, ergastAPIservice, $location) {
        $scope.seasonList = [];
        $scope.season = $routeParams.season;

        ergastAPIservice.listSeasons().success(function (response) {
            $scope.seasonList = response.MRData.SeasonTable.Seasons;
        });

        $scope.filterSeason = function () {
            $location.path($scope.season.season);
        };
    })
    .controller('seasonController', function ($scope, $routeParams, ergastAPIservice) {
        $scope.season = $routeParams.season;
        $scope.driverList = [];
        $scope.teamList = [];
        $scope.nameFilter = null;
        $scope.teamFilter = null;

        $scope.searchFilter = function (driver) {
            var driverRe = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || driverRe.test(driver.Driver.givenName) || driverRe.test(driver.Driver.familyName);
        };

        ergastAPIservice.getDrivers($scope.season).success(function (response) {
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });

        ergastAPIservice.getTeams($scope.season).success(function (response) {
            $scope.teamList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        });
    })
    .controller('driverController', function ($scope, $routeParams, ergastAPIservice) {
        $scope.season = $routeParams.season;
        $scope.id = $routeParams.id;
        $scope.races = [];

        ergastAPIservice.getDriverRaces($scope.season, $scope.id).success(function (response) {
            $scope.races = response.MRData.RaceTable.Races;
        })
    })
    .controller('teamController', function ($scope, $routeParams, ergastAPIservice) {
        $scope.id = $routeParams.id;
        $scope.season = $routeParams.season;
        $scope.team = null;

        ergastAPIservice.getTeamDetails($scope.id, $scope.season).success(function (response) {
            $scope.team = response.MRData;
        });
    });
