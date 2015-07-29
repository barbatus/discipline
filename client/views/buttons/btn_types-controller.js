app.views.controller('BtnTypesCtrl', ['$scope', '$meteor', '$timeout',
    function($scope, $meteor, $timeout) {
        $scope.btnTypes = $meteor.collection(function() {
            return depot.buttons.getTypes();
        }, false);

        $scope.chooseType = function(btnType) {
            $scope.btnModel.type = btnType.type;
        };
    }]);
