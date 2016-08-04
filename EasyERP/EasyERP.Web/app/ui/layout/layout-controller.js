(function () {
    'use strict';
    var controllerId = 'LayoutCtrl';
    var app = angular.module('EasyERPApp');
    app.controller(controllerId, [ '$rootScope','userservice', layoutController]);
    function layoutController($rootScope,userservice) {
        var vm = this;
    }
})();