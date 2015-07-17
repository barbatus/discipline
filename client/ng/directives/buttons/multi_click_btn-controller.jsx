class MultiClickBtnCtrl extends BasicBtnCtrl {
    constructor($scope, $timeout) {
        super($scope);
        this.$timeout = $timeout;
    }

    click() {
        var self = this;
        super.click(function() {
            self.$timeout(function() {
                self.checked = false;
            });
        });
    }
};

app.controls.controller('NgMultiClickButtonController', ['$scope', '$timeout',
    MultiClickBtnCtrl]);
