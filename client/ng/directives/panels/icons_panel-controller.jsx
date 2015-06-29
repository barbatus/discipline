class IconsPanelCtrl {
    constructor($scope, $timeout, $element) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$element = $element;
        var iconSize = this.getIconSize();
        this.iconStyle = {
            width: iconSize[0] + 'px',
            height: iconSize[1] + 'px'
        };

        if ($scope.ngModel) {
            $scope.initIcon = depot.icons.getBtnIcon($scope.ngModel);
        }

        var self = this;
        $scope.$watch('btnIcons', function(newIcons, oldIcons) {
            self.btnIconsRows = self.splitRows(newIcons, $scope.initIcon);
        }, true);
    }

    splitRows(btnIcons, initIcon) {
        var len = btnIcons.length;
        var iconRows = [];
        var iconRow = initIcon ? [initIcon] : [];
        var rowSize = this.rowSize;
        var startInd = 0;
        if (initIcon) {
            for (var i = 0; i < len; i++) {
                var icon = btnIcons[i];
                if (initIcon._id != icon._id) {
                    iconRow.push(icon);
                }
                if (iconRow.length == rowSize) {
                    break;
                }
            }
            iconRows.push(iconRow);
            iconRow = [];
            startInd = i + 1;
        }
        for (var i = startInd; i < len; i++) {
            if (iconRow.length == rowSize) {
                iconRows.push(iconRow);
                iconRow = [];
            }
            var icon = btnIcons[i];
            if (!initIcon || initIcon._id != icon._id) {
                iconRow.push(icon);
            }
        }
        if (iconRow.length) {
            iconRows.push(iconRow);
        }
        return iconRows;
    }

    getIconSize() {
        var padding = 20;
        var rowSize = this.rowSize;
        var margin = (rowSize - 1) * 5;
        var width = (window.innerWidth - padding - margin) / rowSize;
        return [width, width];
    }

    get rowRize() {
        return 5;
    }

    chooseIcon(iconId) {
        this.$scope.ngModel = iconId;
    }
};

app.controls.controller('NgIconsPanelController', ['$scope', '$timeout', '$element',
    IconsPanelCtrl]);
