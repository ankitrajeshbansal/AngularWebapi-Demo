(function () {
    'use strict';
    var app = angular.module('EasyERPApp');
    
    var urlPrefix = "http://localhost:50603/api/";
    var config = {
        appErrorPrefix: '[HT Error] ', //Configure the exceptionHandler decorator        
        servicesUrlPrefix: urlPrefix,
        servicesUrlSufix:'',
        serverTimeoutMs: 30000
    };

    // Make the above config settings available via config.
    app.value('config', config);


})();