var BtnModes = {
    CLICK_MODE: 1,
    EDIT_MODE: 2,
    CHART_MODE: 3
};

app.pages.controller('MainCtrl', ['$scope', '$meteor', '$ionicModal',
    function($scope, $meteor, $ionicModal) {
        $scope.btnModes = BtnModes;

        $scope.buttons = $meteor.collection(function() {
            return depot.buttons.get();
        }, false);

        $scope.showAddDlg = function() {
            $ionicModal.fromTemplateUrl('client/views/buttons/new_button.ng.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.addModal = modal;
                $scope.addModal.show();
            });
        };

        $scope.hideAddDlg = function() {
            if ($scope.addModal) {
                $scope.addModal.remove();
            }
        }

        $scope.showAddButton = function() {
            $scope.showAddDlg();
        };

        $scope.addButton = function(type, btnCfg) {
            var button = BtnFactory.create(type, btnCfg);
            button.save();

            $scope.hideAddDlg();
        };

        $scope.closeNewButton = function() {
            $scope.hideAddDlg();
        };

        $scope.mode = BtnModes.CLICK_MODE;
        $scope.setMode = function(mode) {
            $scope.mode = mode;
        }

        $scope.$on('$bclick', function() {
            if ($scope.mode == BtnModes.EDIT_MODE) {
                $scope.showAddDlg();
            }
        });
    }]);
