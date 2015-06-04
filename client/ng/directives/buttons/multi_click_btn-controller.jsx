class MultiClickBtnCtrl extends BasicBtnCtrl {
    constructor($scope, $timeout) {
        super($scope);
        this.$timeout = $timeout;
    }

    click() {
        super.click();
        var self = this;
        this.$timeout(function() {
            self.checked = false;
        });
    }
};

app.controls.controller('NgMultiClickButtonController', ['$scope', '$timeout',
    MultiClickBtnCtrl]);
