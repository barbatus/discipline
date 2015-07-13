app.controls.directive('ngMultiClickButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgMultiClickButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngEditMode: '=?'
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button"\
                    ng-click="$ctrl.onClick()">\
                    <input type="checkbox" ng-checked="$ctrl.checked"\
                        ng-if="!$ctrl.editMode"\
                        ng-disabled="!$ctrl.enabled">\
                    <div ng-show="$ctrl.model.count" class="count">\
                        {{$ctrl.model.count}}\
                    </div>\
                    <div class="button">\
                        <div ng-if="$ctrl.icon" style="background-image:url({{$ctrl.icon}})"\
                            class="icon">\
                        </div>\
                        <span ng-if="!$ctrl.icon" class="label">{{$ctrl.model.name}}</span>\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);
