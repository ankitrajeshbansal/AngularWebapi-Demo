(function () {
    'use strict';
    var app = angular.module('EasyERPApp');

    // constant routes for 
    app.constant('routes', getRoutes());

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'routes', routeConfigurator]);
    function routeConfigurator($stateProvider, $urlRouterProvider, $locationProvider, routes) {
        routes.forEach(function (r) {
            $stateProvider.state(r.name, r.stateConfig);
        });
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('#/', '/login');
        //$locationProvider.html5Mode(false);
    }
    function getRoutes() {
        return [
                {
                    name: 'login',
                    stateConfig: {
                        url: '/login',
                        templateUrl: 'app/ui/login/login.html',
                        data: {
                            hasPermission: [],
                            authRequire: false,
                            excludeFromMenu: false,
                            menuParent: '',
                            nav: 1,
                            noChildren: true,
                            content: 'Login',
                            title: 'Login'
                        }
                    }
                },
                {
                    name: 'home',
                    stateConfig: {
                        url: '/home',
                        templateUrl: 'app/ui/home/index.html',
                        data: {
                            hasPermission: [1],
                            authRequire: true,
                            excludeFromMenu: false,
                            menuParent: '',
                            nav: 2,
                            noChildren: false,
                            content: 'Index',
                            title: 'Index'
                        }
                    }
                },
                {
                    // nested ui-view in angular
                    name: 'home.nested',
                    stateConfig: {
                        url: '/home.nested',
                        templateUrl: 'app/ui/home/index.nested.html',
                        data: {
                            hasPermission: [1],
                            authRequire: true,
                            excludeFromMenu: false,
                            menuParent: '',
                            nav: 2,
                            noChildren: false,
                            content: 'Index',
                            title: 'Index'
                        }
                    }
                },
                {
                    name: 'user-list',
                    stateConfig: {
                        url: '/user-list',
                        templateUrl: 'app/ui/user/user-list.html',
                        data: {
                            hasPermission: [1],
                            authRequire: true,
                            excludeFromMenu: false,
                            menuParent: 'user',
                            nav: 2.1,
                            noChildren: true,
                            content: 'user List',
                            title: 'user List'
                        }
                    }
                },
                {
                    name: 'layout',
                    stateConfig: {
                        url: '/layout',
                        templateUrl: 'app/ui/layout/layout.html',
                        data: {
                            hasPermission: [1],
                            authRequire: true,
                            excludeFromMenu: false,
                            menuParent: '',
                            nav: 3,
                            noChildren: false,
                            content: 'layout',
                            title: 'layout'
                        }
                    }
                },
                //{
                //    name: 'definition-detail',
                //    stateConfig: {
                //        url: '/definition-detail/:definitionName',
                //        templateUrl: 'app/ui/rule/definition-detail.html',
                //        data: {
                //            hasPermission: [1],
                //            authRequire: true,
                //            excludeFromMenu: false,
                //            menuParent: 'definition',
                //            nav: 3.1,
                //            noChildren: true,
                //            content: 'Definition Detail',
                //            title: 'Definition Detail'
                //        },
                //        ncyBreadcrumb: {
                //            label: 'Definition Detail'
                //        }
                //    }
                //},
                //{
                //    name: 'forget-password',
                //    stateConfig: {
                //        url: '/forget-password',
                //        templateUrl: 'app/ui/login/forget-password.html',
                //        data: {
                //            hasPermission: [],
                //            authRequire: false,
                //            excludeFromMenu: false,
                //            menuParent: '',
                //            nav: 1,
                //            noChildren: true,
                //            content: 'Forget Password',
                //            title: 'Forget Password'
                //        }
                //    }
                //}
        ];
    }

    app.run(['$rootScope', '$state', '$window', '$location', '$http', 'localStorageService', runConfigurator]);
    function runConfigurator($rootScope, $state, $window, $location, $http, localStorageService) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current, currentParams) {
            var isLogin = next.name === "login";
            if (isLogin) {
                return; // no need to redirect 
            }
            // now, redirect only not authenticated

            var _user = localStorageService.get('CurrentUser');
            if (!_user) {
                $state.go('login');
            }
            });

        var user = localStorageService.get('CurrentUser');
        if (user) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + user;
        }
       //console.log('call');

    }
    //app.config(['$httpProvider', function ($httpProvider) {
    //    $httpProvider.defaults.useXDomain = true;
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //}]);
})();