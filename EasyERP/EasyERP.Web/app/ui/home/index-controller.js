(function () {
    'use strict';
    var controllerId = "indexCtrl";
    var app = angular.module("EasyERPApp");
    app.controller(controllerId, ['$scope', '$rootScope', '$state','userservice', indexController]);
    function indexController($scope, $rootScope, $state, userservice) {
        var self = this;        
    }

})();