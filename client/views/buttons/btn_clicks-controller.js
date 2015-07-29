app.views.controller('BtnProfileCtrl', ['$scope', '$meteor', '$timeout', '$ionicLoading',
    function($scope, $meteor, $timeout, $ionicLoading) {
        $scope.clicks = $meteor.collection(function() {
            return $scope.btnModel.getTodayClicks();
        });

        $scope.remove = function(clickId) {
            $ionicLoading.show();
            $scope.btnModel.removeClick(clickId, function(errorMsg) {
                $ionicLoading.hide();
            });
        };

        $scope.clickInfo = function(clickId) {
            return $scope.btnModel.getClickInfo(clickId);
        };
    }]);
