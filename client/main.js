var app = angular.module('app', [
    'angular-meteor',
    'ui.router',
    'ionic',
    'app.pages',
    'app.controls']);

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'client/pages/main/main.ng.html',
            controller: 'MainCtrl'
        });

    $urlRouterProvider.otherwise('/main');
}]);

function onReady() {
    angular.bootstrap(document, ['app']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}
