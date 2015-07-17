class BasicBtnCtrl_ {
    constructor($scope) {
        this.$scope = $scope;
        this._model = $scope.ngModel;
        this._checked = false;
        this._editMode = false;

        var self = this;
        $scope.$watch('ngEditMode', function(editMode) {
            self._editMode = editMode;
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

    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
    }

    get model() {
        return this._model;
    }

    get enabled() {
        return !this.editMode;
    }

    get editMode() {
        return this._editMode;
    }

    get icon() {
        return this.model.icon;
    }
};

BasicBtnCtrl = BasicBtnCtrl_;
