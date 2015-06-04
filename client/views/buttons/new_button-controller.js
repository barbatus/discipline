app.views.controller('NewBtnCtrl', ['$scope', '$meteor', 'WizardHandler',
    function($scope, $meteor, wizardHandler) {

        $scope.btnType = null;
        $scope.btnIcon = null;
        $scope.btnConfig = {};

        $scope.btnTypes = $meteor.collection(function() {
            return depot.buttons.getTypes();
        }, false);

        $scope.btnIcons = $meteor.collection(function() {
            return depot.icons.get();
        }, false);

        $scope.chooseBtn = function(type) {
            $scope.btnType = type;
        };

        $scope.chooseIcon = function(iconId) {
            $scope.btnConfig.iconId = iconId;
        };

        $scope.backBtn = function() {
            wizardHandler.wizard().previous();
        };

        $scope.hasBack = function() {
            return wizardHandler.wizard().currentStepNumber() > 1;
        };
    }]);
