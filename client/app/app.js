'use strict';

(function(){

  // Angular Style Guide - Wrap modules in an IIFE.

  //Global object for storing callback functions
  // Quick comment for a new commit
  window._app = {};

  var defaultRouteConfig = function($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
  };

  var restangularConfig = function(Restangular, $window, $state){

    var jwtRequestInterceptor = function(element, operation, route, url, headers){
      var jwt = $window.localStorage.getItem('jwt');
      // console.log('this is jwt: ', jwt);
      if (jwt){
        headers['x-access-token'] = jwt;
        // console.log(headers['x-access-token'], 'THIS IS HEADERS[\'x-access-token\']');
        // console.log(headers, 'THIS IS HEADERS');
      }
      return {
        headers: headers
      };
    };

    var errorResponseInterceptor = function(response) {
      var isUnauthorized = response.status === 401;
      var routeToLogin = response.data ? response.data.routeToLogin : false;

      if (isUnauthorized && routeToLogin){
        console.log('Unauthorized, Error Response Interceptor: ', response);
        $state.go('login');
      }
    };

    Restangular.setErrorInterceptor(errorResponseInterceptor);
    Restangular.addFullRequestInterceptor(jwtRequestInterceptor);
  };

  angular
    .module('AYARApp', [
      'ngMaterial',
      'ui.router',
      'restangular',
      'ngAria'
      ])

    .config(['$urlRouterProvider', defaultRouteConfig])

    .run(['Restangular', '$window', '$state', restangularConfig]);

})();
