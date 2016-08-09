(function () {
    'use strict';

    var projectsApp = angular.module('projectsApp', ['ngRoute', 'ngCookies']);
        /*.config(config)
        .run(run);*/

    
    projectsApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',
             {
                controller: 'HomeController',
                templateUrl: 'scripts/home/home.view.html',
                controllerAs: 'vm',
                resolve: {
                          'serviceNowService':function(serviceNowService){
                            return serviceNowService.recordPromise;
                          }
                        }
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'scripts/login/login.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'scripts/register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }).run(function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    });

})();