app.controls.directive('ngTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgTrackButtonController',
        controllerAs: '$ctrl',
        scope: {
            ngModel: '=?'
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button">\
                    <input type="checkbox">\
                    <span class="button"></span>\
                    <span class="label">{{$ctrl.$scope.ngModel.title}}</span>\
                </div>\
            </div>\
        '
    };
}]);

app.controls.controller('NgTrackButtonController', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        this.$scope = $scope;
    }]);
