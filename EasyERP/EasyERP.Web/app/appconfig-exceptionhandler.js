(function () {
    'use strict';

    var app = angular.module('EasyERPApp');

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).

    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', 'config', 'logger', extendExceptionHandler]);
    }]);

    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate, config, logger) {
        var appErrorPrefix = config.appErrorPrefix;
        var logError = logger.getLogFn('app', 'error');
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message != null && exception.message.indexOf(appErrorPrefix) === 0) { return; }

            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix;

            if (exception.message != null) {
                msg = msg + exception.message;
            }
            else {
                if (exception.statusText != null) {
                    msg = msg + exception.status + " " + exception.statusText + ". ";
                    if (exception.data != null && exception.data.message != null) {
                        msg = msg + exception.data.message;
                    }
                }
            }
            //loggingservice.saveLog(exception, cause);
            logError(msg, errorData, true);
        };
    }
})();