app.controls.directive('ngTrackButton', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgTrackButtonController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngEditMode: '=?'
        },
        template: '\
            <ng-multi-click-button ng-if="$ctrl.multiClick" ng-edit-mode="ngEditMode"\
                ng-model="ngModel">\
            </ng-multi-click-button>\
            <ng-opd-track-button ng-if="$ctrl.opdTrack" ng-edit-mode="ngEditMode"\
                ng-model="ngModel">\
            </ng-opd-track-button>\
            <ng-input-track-button ng-if="$ctrl.inTrack" ng-edit-mode="ngEditMode"\
                ng-model="ngModel">\
            </ng-input-track-button>\
        '
    };
}]);

class TrackBtnCtrl {
    constructor($scope) {
        this.model = $scope.ngModel;
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
}

app.controls.controller('NgTrackButtonController', ['$scope', TrackBtnCtrl]);
