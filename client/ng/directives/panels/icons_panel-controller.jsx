class IconsPanelCtrl {
    constructor($scope, $timeout, $element) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$element = $element;
        this.rowSize = 5;

        if ($scope.ngModel) {
            $scope.initIcon = depot.icons.getBtnIcon($scope.ngModel);
        }

        var self = this;
        $scope.$watch('btnIcons', function(newIcons, oldIcons) {
            self.btnIconsRows = self.splitRows(newIcons, $scope.initIcon);
            self.setIconSize();
        }, true);
    }

    splitRows(btnIcons, initIcon) {
        var len = btnIcons.length;
        var iconRows = [];
        var iconRow = initIcon ? [initIcon] : [];
        var startInd = 0;
        if (initIcon) {
            for (var i = 0; i < len; i++) {
                var icon = btnIcons[i];
                if (initIcon._id != icon._id) {
                    iconRow.push(icon);
                }
                if (iconRow.length == this.rowSize) {
                    break;
                }
            }
            iconRows.push(iconRow);
            iconRow = [];
            startInd = i + 1;
        }
        for (var i = startInd; i < len; i++) {
            if (iconRow.length == this.rowSize) {
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

    setIconSize() {
        var padding = 20;
        var margin = (this.rowSize - 1) * 5;
        var width = (window.innerWidth - padding - margin) / this.rowSize;
        this.iconStyle = {
            width: width + 'px',
            height: width + 'px'
        };
    }

    chooseIcon(iconId) {
        this.$scope.ngModel = iconId;
    }
};

app.controls.controller('NgIconsPanelController', ['$scope', '$timeout', '$element',
    IconsPanelCtrl]);
