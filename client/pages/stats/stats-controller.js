var CalModes = {
    MONTH_MODE: 1,
    YEAR_MODE: 2
};

app.pages.controller('StatsCtrl', ['$rootScope', '$scope', '$timeout', '$stateParams',
    '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory',
    function($rootScope, $scope, $timeout, $stateParams,
        $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {
        $scope.mode = CalModes.MONTH_MODE;
        $scope.btnId = $stateParams.btnId;
        $scope.calModes = CalModes;

        var orientChange = function() {
            $scope.isRotating = false;
            $scope.$apply();
        };

        window.addEventListener('orientationchange', orientChange);
        $scope.$on('$destroy', function() {
            window.removeEventListener('orientationchange', orientChange);
        });

        $scope.setLoading = function(loading) {
            if (loading) {
                $scope.isLoading = true;
                $ionicLoading.show();
            } else {
                $scope.isLoading = false;
                $ionicLoading.hide();
            }
        };

        $scope.changeMode = function(mode) {
            $scope.isRotating = true;
            $scope.setLoading(true);
            if (mode == CalModes.YEAR_MODE) {
                screen.lockOrientation('landscape');
            } else {
                screen.lockOrientation('portrait');
            }
            $scope.mode = mode;
        };

        // $scope.$on('ycal.render', function() {
        //     console.log('render');
        //     $scope.setLoading(true);
        // });

        $scope.$on('ycal.rendered', function() {
            $scope.setLoading(false);
        });

        $scope.$on('ycal.onNext', function() {
            $scope.setLoading(true);
        });

        $scope.$on('ycal.onPrev', function() {
            $scope.setLoading(true);
        });

        $scope.$on('mcal.rendered', function() {
            $scope.setLoading(false);
        });
    }]);
