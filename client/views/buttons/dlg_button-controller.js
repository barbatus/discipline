app.views.controller('DlgBtnCtrl', ['$scope', '$meteor', 'WizardHandler',
    function($scope, $meteor, wizardHandler) {

        $scope.btnTypes = $meteor.collection(function() {
            return depot.buttons.getTypes();
        }, false);

        $scope.chooseIcon = function(iconId) {
            $scope.btnCfg.iconId = iconId;
        };

        $scope.chooseType = function(btnType) {
            $scope.btnType = btnType;
        };

        $scope.backBtn = function() {
            wizardHandler.wizard().previous();
        };

        $scope.hasBack = function() {
            if (wizardHandler.wizard().currentStepNumber) {
                return wizardHandler.wizard().currentStepNumber() > 1;
            }
        };
    }]);
