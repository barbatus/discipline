app.pages.controller('MainCtrl', ['$scope', '$meteor', '$ionicModal',
    function($scope, $meteor, $ionicModal) {
        $scope.buttons = $meteor.collection(function() {
            return depot.buttons.get();
        }, false);

        $ionicModal.fromTemplateUrl('client/views/buttons/new_button.ng.html',
            function(modal) {
                $scope.taskModal = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up'
            });

        $scope.showAddButton = function() {
            $scope.button = Button.create();
            $scope.taskModal.show();
        };

        $scope.addButton = function(button) {
            button.save();

            $scope.taskModal.hide();
        };

        $scope.closeNewButton = function() {
            $scope.taskModal.hide();
        };

    }]);
