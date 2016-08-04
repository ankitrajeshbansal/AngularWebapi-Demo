// Name: loginservice
// Type: Angular Service
// Purpose: To provide all server integration for managing reference data 
// Design: On initialisation this service loads the reference data from the server
(function () {
    'use strict';
    var serviceId = 'userservice';
    angular.module('EasyERPApp').factory(serviceId,
        ['Base64','$http', '$rootScope', 'config', '$q', '$state', 'localStorageService', userService]);
    function userService(Base64,$http, $rootScope, config, $q, $state, localStorageService) {
        var baseUrl = config.servicesUrlPrefix;
        var service = {
            validateUser: validateUser,
            redirectTo: redirectTo,
            clearCredentials: clearCredentials,
            userList: userList,
            userSubmitDetail: userSubmitDetail,
            userExist: userExist,
            userGetById: userGetById,
            userDeleteById: userDeleteById
        };
        return service;

        function validateUser(user) {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user/isvalid';
            //var params = { Username: user, password: password };
            return $http({
                url: wkUrl,
                method: 'POST',
                cache: false,
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(success, fail)
            function success(resp) {
                if (resp.data != null){
                    return setCredentials(resp.data);
                }                
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                //throw error; // so caller can see it
                deferred.reject();
            }
            return deferred.promise;
        }

        
        function setCredentials(user)
        {
            clearCredentials();
            if (user.Token != null) {
                $rootScope.ActiveUser = user;
                var authdata = Base64.encode(user.Username + ':' + user.Token);
                localStorageService.set('CurrentUser', authdata);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                return true;
            }
            return false;
        }

        function clearCredentials()
        {
            console.log('clear');
            delete $http.defaults.headers.common.Authorization;
           localStorageService.remove('CurrentUser');
        }

        function redirectTo()
        {
            var user = localStorageService.get('CurrentUser');
            if (user) {
                $state.go('home');
                // nested ui-view in angular
                //$state.go('home.nested');
            }            
        }

        function userList()
        {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user';
            //var params = { Username: user, password: password };
            return $http({
                url: wkUrl,
                method: 'GET',
                cache: false,
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            }).then(success, fail)
            function success(resp) {
                return resp.data;
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                deferred.reject();
            }
            return deferred.promise;
        }

        function userExist(userDetail) {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user/isExists';
            return $http({
                url: wkUrl,
                method: 'POST',
                cache: false,
                data: userDetail,
                headers: { 'Content-Type': 'application/json' }
            }).then(success, fail)
            function success(resp) {
                return resp.data;
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                deferred.reject();
            }
            return deferred.promise;
        }
        function userSubmitDetail(userDetail) {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user/submitDetail';
            return $http({
                url: wkUrl,
                method: 'POST',
                cache: false,
                data: userDetail,
                headers: { 'Content-Type': 'application/json' }
            }).then(success, fail)
            function success(resp) {
                return resp.data;
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                deferred.reject();
            }
            return deferred.promise;
        }

        function userGetById(userId)
        {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user/'+userId;
            return $http({
                url: wkUrl,
                method: 'GET',
                cache: false,
                headers: { 'Content-Type': 'application/json' }
            }).then(success, fail)
            function success(resp) {
                return resp.data;
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                deferred.reject();
            }
            return deferred.promise;
        }
        function userDeleteById(userId) {
            var deferred = $q.defer();
            var wkUrl = baseUrl + 'user/' + userId;
            return $http({
                url: wkUrl,
                method: 'DELETE',
                cache: false,
                headers: { 'Content-Type': 'application/json' }
            }).then(success, fail)
            function success(resp) {
                return resp.data;
                deferred.resolve();
            }
            function fail(error) {
                var msg = error.data && error.data.friendlymessage ? error.data.friendlymessage : error.status + " ( " + error.statustext + " )";
                alert(msg + ', ' + error);
                deferred.reject();
            }
            return deferred.promise;
        }
    }
})();
