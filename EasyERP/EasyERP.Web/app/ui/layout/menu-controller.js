(function () {
    'use strict';
    var controllerId = 'MenuCtrl';
    var app = angular.module('EasyERPApp');
    app.controller(controllerId, ['userservice', '$state', '$rootScope', menuController]);
    function menuController(userservice, $state, $rootScope) {
        var vm = this;       
        vm.User = $rootScope.ActiveUser;
        vm.logout = function () {
            userservice.clearCredentials();
            $state.go('login');
        }
    }
})();