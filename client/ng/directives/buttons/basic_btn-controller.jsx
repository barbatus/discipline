class BasicBtnCtrl_ {
    constructor($scope) {
        this._model = $scope.ngModel;
        this._checked = false;
    }

    click() {
        if (this.enabled) {
            this.checked = true;
            this.model.click();
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
        return true;
    }
}

BasicBtnCtrl = BasicBtnCtrl_;
