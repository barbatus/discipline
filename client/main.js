var app = angular.module('app', [
    'angular-meteor',
    'ui.router',
    'ionic',
    'app.pages',
    'app.views',
    'app.controls']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'client/main.ng.html'
        })
        .state('app.main', {
            url: '/main',
            templateUrl: 'client/pages/main/main.ng.html',
            controller: 'MainCtrl'
        })
        .state('app.stats', {
            url: '/stats/:btnId',
            templateUrl: 'client/pages/stats/stats.ng.html',
            controller: 'StatsCtrl'
        })
        .state('app.alerts', {
            url: '/alerts',
            templateUrl: 'client/pages/alerts/alerts.ng.html',
            controller: 'AlertsCtrl'
        });

    $urlRouterProvider.otherwise('/app/main');
}]);

app.run(['$rootScope', function($rootScope) {

    var runner = new TaskRunner();
    runner.runAtNight(function() {
        $rootScope.$apply();
    });

    var task = new OutAlertTask();
    runner.runEveryMins(function() {
        task.run();
    }, 15);

    $rootScope.getAppIcon = client.getAppIcon;

}]);

function onReady() {
    angular.bootstrap(document, ['app']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
