app.pages.controller('MainCtrl', ['$scope', '$meteor', function($scope, $meteor) {
    $scope.buttons = $meteor.collection(function() {
        return Buttons.find({});
    });
}]);
