var BtnModes = {
    CLICK_MODE: 1,
    EDIT_MODE: 2,
    STATS_MODE: 3
};

app.pages.controller('MainCtrl', ['$rootScope', '$scope', '$timeout', '$meteor',
    '$state', 'BtnDialog',
    function($rootScope, $scope, $timeout, $meteor, $state, BtnDialog) {

        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $timeout(function() {
                    screen.lockOrientation('portrait');
                });
            });

        $scope.btnModes = BtnModes;

        $scope.groupBy = null;
        $scope.buttons = $meteor.collection(function() {
            return BasicBtn.getAll();
        }, false);

        $scope.showAddButton = function() {
            var newBtnDlg = BtnDialog.newBtn();
            newBtnDlg.open(function(type, btnCfg, btnBits) {
                var button = BtnFactory.create(type, btnCfg, btnBits);
                console.log(button);
                button.save();
            });
        };

        $scope.showEditButton = function(button) {
            var editBtnDlg = BtnDialog.editBtn();
            editBtnDlg.open(button, function(button) {
                button.save();
            });
        };

        $scope.mode = BtnModes.CLICK_MODE;
        $scope.setMode = function(mode) {
            $scope.mode = mode;
        };

        $scope.$on('$bclick', function($event, btnId) {
            if ($scope.mode == BtnModes.EDIT_MODE) {
                var button = depot.buttons.getButton(btnId);
                $scope.showEditButton(button);
            }
            if ($scope.mode == BtnModes.STATS_MODE) {
                $state.go('app.stats', {btnId: btnId});
            }
        });

        $scope.newAlerts = $meteor.collection(function() {
            return depot.alerts.get(false);
        }, false);
    }]);
