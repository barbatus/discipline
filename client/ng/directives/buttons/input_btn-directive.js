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
                <div class="app-button"\
                    ng-click="$ctrl.onClick()">\
                    <div ng-show="$ctrl.model.value && !$ctrl.editMode"\
                        class="count">\
                        &Sigma;{{$ctrl.model.value}}\
                    </div>\
                    <div ng-show="$ctrl.editMode" class="remove"\
                        ng-click="$ctrl.archive($event)">\
                    </div>\
                    <input type="checkbox" ng-if="!$ctrl.editMode"\
                        ng-checked="$ctrl.checked"\
                        ng-disabled="!$ctrl.enabled">\
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
