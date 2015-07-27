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
                });
            });
        }, function() {
            self.checked = false;
        });
    }

    showInput_(addCall, cancelCall) {
        var $scope = this.$scope;
        var $timeout = this.$timeout;
        $scope.input = {};
        this.$ionicPopup.show({
            template: '\
                <div class="list list-inset">\
                    <label class="item item-input">\
                        <input type="number" ng-model="input.value">\
                    </label>\
                </div>\
                <div ng-show="isInvalid" class="error">\
                    Please enter number value\
                </div>\
            ',
            title: 'Enter Value to Save',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                onTap: function(e) {
                    e.stopPropagation();
                    return cancelCall;
                }
            }, {
                text: '<b>Add</b>',
                type: 'button-positive',
                onTap: function(e) {
                    e.stopPropagation();
                    var value = $scope.input.value;
                    if (_.isNumber(value)) {
                        return _.partial(addCall, value);
                    } else {
                        $scope.isInvalid = true;
                        e.preventDefault();
                    }
                }
            }]
        }).then(function(callback) {
            $timeout(function() {
                callback();
            }, 300);
        });
    }
};

app.controls.controller('NgInputTrackButtonController', ['$scope', '$timeout', '$ionicPopup',
    InputTrackBtnCtrl]);
