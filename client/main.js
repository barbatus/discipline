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
        .state('main', {
            url: '/main',
            templateUrl: 'client/pages/main/main.ng.html',
            controller: 'MainCtrl'
        })
        .state('stats', {
            url: '/stats/:btnId',
            templateUrl: 'client/pages/stats/stats.ng.html',
            controller: 'StatsCtrl'
        });

    $urlRouterProvider.otherwise('/main');
}]);

app.run(['$rootScope', function($rootScope) {
    later.date.localTime();

    later.setTimeout(function() {
        $rootScope.$apply();
    }, later.parse.text('at 12:00 pm'));

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
