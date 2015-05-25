app.controls.directive('ngOpdTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgOpdTrackButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button""\
                    ng-click="$ctrl.click()">\
                    <input type="checkbox" ng-checked="$ctrl.checked"\
                        ng-disabled="!$ctrl.enabled">\
                    <span class="button"></span>\
                    <span class="label">{{$ctrl.model.name}}</span>\
                    <div ng-show="$ctrl.model.count" class="count">\
                        {{$ctrl.model.count}}\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);
