class DlgNewBtnCtrl_ {
    constructor($scope, $meteor) {
        this.$scope = $scope;
        this.step_ = 0;
        this.isMoving_ = false;

        $scope.btnTypes = $meteor.collection(function() {
            return depot.buttons.getTypes();
        }, false);

        $scope.chooseType = function(btnType) {
            $scope.btnType = btnType;
        };
    }

    nextBtn() {
        if (this.isLast) {
            this.onFinish();
            return;
        }
        this.step_++;
        this.animateNext_();
    }

    backBtn() {
        this.step_--;
        this.animateNext_();
    }

    onFinish() {
       this.$scope.onFinish();
    }

    onClose() {
        this.$scope.onClose();
    }

    get step() {
        return this.steps[this.step_];
    }

    get steps() {
        return [{name: 'Button type'}, {name: 'Button icon'}, {name: 'Settings'}];
    }

    get isLast() {
        return this.step_ == this.steps.length - 1;
    }

    get hasBack() {
        return this.step_ > 0;
    }

    get isOnNext() {
        return this.isOnNext_;
    }

    checkActive(step) {
        return this.step_ == step;
    }

    checkPrev(step) {
        return this.step_ - 1 == step;
    }

    animateNext_() {
        this.isOnNext_ = true;
        var self = this;
        setTimeout(function() {
            self.isOnNext_ = false;
        }, 200);
    }
};

class DlgEditBtnCtrl_ extends DlgNewBtnCtrl_ {
    get steps() {
        return [{name: 'Button icon'}, {name: 'Settings'}];
    }
};

app.views.controller('DlgNewBtnCtrl', ['$scope', '$meteor', DlgNewBtnCtrl_]);

app.views.controller('DlgEditBtnCtrl', ['$scope', '$meteor', DlgEditBtnCtrl_]);
