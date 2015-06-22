app.views.controller('DlgBtnCtrl', ['$scope', '$meteor',
    function($scope, $meteor) {

        $scope.btnTypes = $meteor.collection(function() {
            return depot.buttons.getTypes();
        }, false);

        $scope.chooseType = function(btnType) {
            $scope.btnType = btnType;
        };
    }]);
