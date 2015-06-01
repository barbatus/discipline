app.views.controller('NewBtnCtrl', ['$scope', '$meteor', 'WizardHandler',
    function($scope, $meteor, wizardHandler) {

        $scope.btnType = null;
        $scope.btnConfig = {};

        $scope.btnTypes = depot.buttons.getTypes();

        $scope.chooseBtn = function(type) {
            $scope.btnType = type;
        }

        $scope.backBtn = function() {
            wizardHandler.wizard().previous();
        }

        $scope.hasBack = function() {
            return wizardHandler.wizard().currentStepNumber() > 1;
        }
    }]);
