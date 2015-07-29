class BasicBtnCtrl_ {
    constructor($scope) {
        this.$scope = $scope;
        this.model_ = $scope.ngModel;
        this.checked_ = false;
        this.editMode_ = false;

        var self = this;
        $scope.$watch('ngEditMode', function(editMode) {
            self.editMode_ = editMode;
        });
    }

    onClick() {
        this.$scope.$emit('$bclick', this.model._id);

        if (this.enabled) {
            var self = this;
            this.click(function(errorMsg) {
               self.$scope.$apply();
            });
        }
    }

    click(opt_value, onResult) {
        if (_.isFunction(opt_value)) {
            onResult = opt_value;
            opt_value = null;
        }

        if (this.enabled) {
            this.checked = true;
            this.model.click(opt_value,
                function(errorMsg) {
                    onResult(errorMsg);
                    if (errorMsg) {
                        // TODO: move to a service.
                        window.plugins.toast.showLongBottom(errorMsg);
                    }
                });
        }
    }

    archive(event) {
        event.stopPropagation();
        this.model_.archive();
    }

    get checked() {
        return this.checked_;
    }

    set checked(value) {
        this.checked_ = value;
    }

    get model() {
        return this.model_;
    }

    get enabled() {
        return !this.editMode;
    }

    get editMode() {
        return this.editMode_;
    }

    get icon() {
        return this.model.icon;
    }
};

BasicBtnCtrl = BasicBtnCtrl_;
