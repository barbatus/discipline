app.controls.directive('ngButtonsPanel', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgBtnsPanelController',
        controllerAs: '$ctrl',
        scope: {
            ngGroupBy: '=',
            ngEditMode: '=',
            ngButtons: '='
        },
        template: '\
            <div class="app-buttons-panel"\
                ng-repeat="(groupName, btnGroup) in $ctrl.btnGroups">\
                <div ng-if="ngGroupBy" class="btn-group-name">\
                    {{$ctrl.normGroupName(groupName)}}\
                </div>\
                <div class="buttons-group">\
                    <div class="buttons-row" ng-repeat="btnRow in btnGroup">\
                        <ng-track-button ng-width="$ctrl.btnWidth"\
                            ng-repeat="button in btnRow"\
                            ng-edit-mode="ngEditMode" ng-model="button">\
                        </ng-track-button>\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);

class BtnsPanelCtrl {
    constructor($scope, $meteor, $timeout) {
        var btnSize = this.getBtnSize();
        this.btnWidth = btnSize[0];

        var self = this;
        $scope.$watch('ngGroupBy', function(groupBy) {
            self.btnGroups = self.splitGroups($scope.ngButtons,
                $scope.ngGroupBy);
        });

        $scope.$watch('ngButtons', function(buttons) {
            self.btnGroups = self.splitGroups($scope.ngButtons,
                $scope.ngGroupBy);
        }, true);
    }

    normGroupName(name) {
        return name != 'undefined' ? s.capitalize(name) : 'Other';
    }

    getBtnSize() {
        var padding = 20;
        var rowSize = this.rowSize;
        var margin = (rowSize - 1) * 5;
        var width = (window.innerWidth - padding - margin) / rowSize;
        return [width, width];
    }

    get rowSize() {
        if (window.innerWidth <= 320) {
            return 4;
        } else {
            return 5;
        }
    }

    splitGroups(allButtons, groupBy) {
        var btnGroups = {};

        for (var i = 0; i < allButtons.length; i++) {
            var button = allButtons[i];
            var groupVal = groupBy ? button[groupBy] : 'empty';
            if (!btnGroups[groupVal]) {
                btnGroups[groupVal] = [];
            }
            btnGroups[groupVal].push(button);
        }

        for (var groupVal in btnGroups) {
            var buttons = btnGroups[groupVal];
            var rows = this.getRows(buttons);
            btnGroups[groupVal] = rows;
        }

        return btnGroups;
    }

    getRows(buttons) {
        var rows = [];
        var row = [];
        var rowSize = this.rowSize;
        for (var i = 0; i < buttons.length; i++) {
            if (row.length == rowSize) {
                rows.push(row);
                row = [];
            }
            row.push(buttons[i]);
        }
        if (row.length) {
            rows.push(row);
        }
        return rows;
    }
};

app.controls.controller('NgBtnsPanelController', ['$scope', '$meteor', '$timeout',
    BtnsPanelCtrl]);
