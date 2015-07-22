app.controls.directive('ngTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgTrackButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngEditMode: '=?',
            ngWidth: '=?'
        },
        template: '\
            <ng-multi-click-button ng-if="$ctrl.multiClick" ng-style="$ctrl.btnStyle"\
                ng-edit-mode="ngEditMode" ng-model="ngModel">\
            </ng-multi-click-button>\
            <ng-opd-track-button ng-if="$ctrl.opdTrack" ng-style="$ctrl.btnStyle"\
                ng-edit-mode="ngEditMode" ng-model="ngModel">\
            </ng-opd-track-button>\
            <ng-input-track-button ng-if="$ctrl.inTrack" ng-style="$ctrl.btnStyle"\
                ng-edit-mode="ngEditMode" ng-model="ngModel">\
            </ng-input-track-button>\
            <ng-timer-button ng-if="$ctrl.timer" ng-style="$ctrl.btnStyle"\
                ng-edit-mode="ngEditMode" ng-model="ngModel">\
            </ng-timer-button>\
            <div class="app-button-title" ng-if="$ctrl.model.icon && $ctrl.model.name">\
                <div class="backbox">\
                    {{$ctrl.model.name}}\
                </div>\
            </div>\
        '
    };
}]);

class TrackBtnCtrl {
    constructor($scope) {
        this.model = $scope.ngModel;
        this.btnStyle = {
            width: $scope.ngWidth + 'px',
            height: $scope.ngWidth + 'px'
        };
    }

    get multiClick() {
        return this.model.type == depot.consts.Buttons.MULTI_CLICK;
    }

    get opdTrack() {
        return this.model.type == depot.consts.Buttons.ONCE_PER_DAY;
    }

    get inTrack() {
        return this.model.type == depot.consts.Buttons.INPUT_TRACK;
    }

    get timer() {
        return this.model.type == depot.consts.Buttons.TIMER;
    }
};

app.controls.controller('NgTrackButtonController', ['$scope', TrackBtnCtrl]);
