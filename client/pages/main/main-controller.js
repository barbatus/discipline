var BtnModes = {
    CLICK_MODE: 1,
    EDIT_MODE: 2,
    STATS_MODE: 3
};

app.pages.controller('MainCtrl', ['$rootScope', '$scope', '$meteor', '$state', 'BtnDialog',
    function($rootScope, $scope, $meteor, $state, BtnDialog) {
        $scope.btnModes = BtnModes;

        $scope.groupBy = null;
        $scope.getGroupName = function(key) {
            return key != 'undefined' ? s.capitalize(key) : 'Other';
        };

        $scope.buttons = $meteor.collection(function() {
            return depot.buttons.get();
        }, false);

        $scope.showAddButton = function() {
            var newBtnDlg = BtnDialog.newBtn();
            newBtnDlg.open(function(type, btnCfg) {
                var button = BtnFactory.create(type, btnCfg);
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
                console.log(btnId);
                $state.go('stats', {btnId: btnId});
            }
        });
    }]);
