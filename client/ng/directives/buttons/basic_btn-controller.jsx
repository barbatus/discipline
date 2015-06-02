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
            this.click();
        }
    }

    click(opt_value) {
        if (this.enabled) {
            this.checked = true;
            this.model.click(opt_value);
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
}

BasicBtnCtrl = BasicBtnCtrl_;
