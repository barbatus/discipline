app.controls.directive('ngMultiClickButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgMultiClickButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button""\
                    ng-click="$ctrl.click()">\
                    <input type="checkbox" ng-checked="$ctrl.checked">\
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
