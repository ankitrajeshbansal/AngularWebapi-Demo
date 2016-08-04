(function () {
    'use strict';
    var controllerId = 'UserCtrl';
    var app = angular.module('EasyERPApp');
    app.controller(controllerId, ['$rootScope', '$scope', 'userservice', userController]);
    function userController($rootScope,$scope, userservice) {
        var vm = this;
           

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $('#dataTables-User').DataTable({
                responsive: true
            });
        });
        
        vm.submitUser = function (UserForm)
        {
            if (UserForm.$valid){
                userservice.userExist(vm.User).then(function (resp) {
                    if (resp) {
                        alert('Username is already exist!, Please try again');
                    }
                    else {
                        //Set Default Property
                        vm.User.IsActive = true;

                        userservice.userSubmitDetail(vm.User).then(function (nestResp) {
                            if (nestResp) {
                                vm.User = vm.NewUser();
                                alert('Data save successfully!');
                                $('.close').click();
                                vm.listAll();
                            }
                            else {
                                alert('Something went wrong. Please try again.');
                            }
                        });
                    }
                })
                
            }
        }

        vm.listAll = function () {
            userservice.userList().then(function (resp) {
                vm.UserList = resp;
            });
        };

        vm.edit = function (userId)
        {
            userservice.userGetById(userId).then(function (resp) {
                if (resp!=null) {
                    resp.CreatedDate = new Date(resp.CreatedDate);
                    resp.DOB = new Date(resp.DOB);
                    vm.User = resp;
                }
                else {
                    alert('Something went wrong. Please try again.');
                }
            });
        };

        vm.delete = function (userId) {
            if (confirm('do you confirm to delete this record?')) {
                userservice.userDeleteById(userId).then(function (resp) {
                    if (resp) {
                        alert('Record deleted successfully!');
                        $('.close').click();
                        vm.listAll();
                    }
                    else {
                        alert('Something went wrong. Please try again.');
                    }
                });
            }
        };

        vm.NewUser = function () {
            return {
                Name: '',
                DOB: '',
                Address: '',
                Username: '',
                Password: '',
                IsActive: false,
                CreatedDate: null,
                Token: null,
                LastLoginDate: null
            };
        };

        vm.User = vm.NewUser();

        vm.listAll();
    }
})();