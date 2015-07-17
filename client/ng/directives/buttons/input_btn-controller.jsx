class InputTrackBtnCtrl extends BasicBtnCtrl {
    constructor($scope, $timeout, $ionicPopup) {
        super($scope);
        this.$timeout = $timeout;
        this.$ionicPopup = $ionicPopup;
    }

    click() {
        var self = this;
        self.checked = true;
        this.showInput_(function(value) {
            super.click(value, function(errorMsg) {
                self.$timeout(function() {
                    self.checked = false;
                }, 100);
            });
        }, function() {
            self.$timeout(function() {
                self.checked = false;
            });
        });
    }

    showInput_(addCall, cancelCall) {
        var $scope = this.$scope;
        $scope.input = {};
        this.$ionicPopup.show({
            template: '\
                <div class="list list-inset">\
                    <label class="item item-input">\
                        <input type="number" ng-model="input.value">\
                    </label>\
                </div>\
            ',
            title: 'Enter Value to Save',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                onTap: function() {
                    cancelCall();
                }
            }, {
                text: '<b>Add</b>',
                type: 'button-positive',
                onTap: function(e) {
                    addCall($scope.input.value);
                }
            }]
        });
    }
}

app.controls.controller('NgInputTrackButtonController', ['$scope', '$timeout', '$ionicPopup',
    InputTrackBtnCtrl]);
