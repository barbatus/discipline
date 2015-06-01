app.pages.controller('MainCtrl', ['$scope', '$meteor', '$ionicModal',
    function($scope, $meteor, $ionicModal) {
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
    }]);
