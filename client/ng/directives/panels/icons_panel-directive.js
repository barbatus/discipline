app.controls.directive('ngIconsPanel', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgIconsPanelController',
        controllerAs: '$ctrl',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            btnIcons: '='
        },
        template: '\
            <div class="app-icons-panel">\
                <div ng-repeat="row in $ctrl.btnIconsRows">\
                    <div ng-repeat="btnIcon in row"\
                        ng-style="$ctrl.iconStyle" class="app-button-icon"\
                        ng-click="$ctrl.chooseIcon(btnIcon._id)">\
                        <input type="radio" name="type" ng-checked="btnIcon._id == ngModel">\
                        <img src="{{btnIcon.src}}" class="icon">\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);
