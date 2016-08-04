(function () {
    'use strict';
    var controllerId = 'BaseCtrl';
    var app = angular.module('EasyERPApp');
    app.controller(controllerId, ['$rootScope',  baseController]);
    function baseController($rootScope) {
        var vm = this;
       
    }
})();