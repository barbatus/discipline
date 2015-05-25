class OpdTrackBtnCtrl extends BasicBtnCtrl {
    constructor($scope) {
        super($scope);
    }

    get enabled() {
        return !this.model.clicked;
    }

    get checked() {
        return this.model.clicked;
    }
}

app.controls.controller('NgOpdTrackButtonController', ['$scope', OpdTrackBtnCtrl]);
