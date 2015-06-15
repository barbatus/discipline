app.views.controller('BtnIconsCtrl', ['$scope', '$meteor', '$timeout',
    function($scope, $meteor, $timeout) {

        $scope.getByTagQuery = '';

        if ($scope.btnCfg.iconId) {
            $scope.selectedIcon = depot.icons.getIcon($scope.btnCfg.iconId);
        }

        $scope.btnIcons = $meteor.collection(function() {
            return depot.icons.getByTag(
                $scope.getReactively('getByTagQuery'));
        }, false);

        var tHandle;
        $scope.$watch('searchQuery', function(searchQuery) {
            if (tHandle) {
                $timeout.cancel(tHandle);
            }
            tHandle = $timeout(function() {
                $scope.getByTagQuery = searchQuery;
            }, 100);
        });

    }]);
