(function () {
    'use strict';
    var controllerId = "loginCtrl";
    var app = angular.module("EasyERPApp");
    app.controller(controllerId, ['$scope', '$rootScope', '$state', 'userservice', loginController]);
    function loginController($scope, $rootScope, $state, userservice) {
        var self = this;
        self.initialize = function () {
            userservice.redirectTo();
        }
        
        self.submit = function () {
            var _userDetail = {
                Username: self.email,
                Password: self.password
            }
           userservice.validateUser(_userDetail).then(function (response) {
                if (response==true)
                {
                    $state.go('home');
                }
                else {
                    self.email = '';
                    self.password = '';
                    alert('Please try again');
                }
            });
        };
        self.initialize();
        
    }

})();