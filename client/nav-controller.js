app.pages.controller('NavCtrl', ['$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {
        $scope.goAlerts = function() {
            $state.go('app.alerts');
        };
    }]);
