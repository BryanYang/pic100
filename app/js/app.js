'use strict';

/* App Module */

var picApp = angular.module('picApp', [
    'ngRoute',
    'picControllers',
    'picServices',
    'picFilters',
    'ngFileUpload'
]);

picApp.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {

        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        }).
        when('/Art', {
            templateUrl: 'partials/art.html',
            controller: 'artCtrl'
        }).
        when('/Art/:id', {
            templateUrl: 'partials/artDetail.html',
            controller: 'artDetailCtrl'
        }).
        when('/Cart', {
            templateUrl: 'partials/cart.html',
            controller: 'cartCtrl'
        }).
        when('/CustomOrder', {
            templateUrl: 'partials/customOrder.html',
            controller: 'customOrderCtrl'
        }).

        when('/GetOrder',{
            templateUrl:"partials/customOrderComplete.html",
            controller:"orderCompleteCtrl"
        }).
        otherwise({
            redirectTo: '/'
        });
        
    }
]);