app.pages.controller('AlertsCtrl', ['$rootScope', '$scope', '$meteor',
    function($rootScope, $scope, $meteor) {
        $scope.alerts = $meteor.collection(function() {
            return depot.alerts.get();
        }, false);

        $scope.$watch('alerts', function() {
            var ids = _.map($scope.alerts, function(alert) {
                return alert._id;
            });
            depot.alerts.setRead(ids);
        });

        $scope.getIconSrc = function(btnId) {
            var button = depot.buttons.getButton(btnId);
            return button.icon;
        };

        $scope.isOutdated = function(alert) {
            return alert.type == consts.Alerts.OUTDATED;
        };
    }]);
