app.controls.directive('ngInputTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgInputTrackButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngEditMode: '=?'
        },
        template: '\
            <div class="app-button-wrapper">\
                <div class="app-button""\
                    ng-click="$ctrl.onClick()">\
                    <div ng-show="$ctrl.model.value" class="value">\
                        {{$ctrl.model.value}}\
                    </div>\
                    <input type="checkbox" ng-if="!$ctrl.editMode"\
                        ng-checked="$ctrl.checked"\
                        ng-disabled="!$ctrl.enabled">\
                    <span class="button"></span>\
                    <span class="label">{{$ctrl.model.name}}</span>\
                </div>\
            </div>\
        '
    };
}]);
