app.controls.directive('ngTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgTrackButtonController',
        controllerAs: '$ctrl',
        scope: {
            ngModel: '=?'
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button" ng-click="$ctrl.click()">\
                    <input type="checkbox" ng-disabled="$ctrl.ngModel.clicked"\
                        ng-checked="$ctrl.ngModel.clicked">\
                    <span class="button"></span>\
                    <span class="label">{{$ctrl.ngModel.name}}</span>\
                    <div ng-show="$ctrl.ngModel.count" class="count">\
                        {{$ctrl.ngModel.count}}\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);

app.controls.controller('NgTrackButtonController', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        this.$scope = $scope;
        this.ngModel = $scope.ngModel;

        this.click = function() {
            $scope.ngModel.click();
        };
    }]);
