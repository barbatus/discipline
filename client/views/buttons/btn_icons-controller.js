app.views.controller('BtnIconsCtrl', ['$scope', '$meteor', '$timeout',
    function($scope, $meteor, $timeout) {
        $scope.getByTagQuery = '';

        $scope.btnIcons = $meteor.collection(function() {
            return depot.icons.findByTag(
                $scope.getReactively('getByTagQuery'));
        }, false);

        var tHandle;
        $scope.$watch('searchQuery', function(newQuery, oldQuery) {
            if (newQuery != oldQuery) {
                if (tHandle) {
                    $timeout.cancel(tHandle);
                }
                tHandle = $timeout(function() {
                    $scope.getByTagQuery = newQuery;
                }, 100);
            }
        });
    }]);
