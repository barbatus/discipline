var saveIntrlMs = 1000;

class TimerBtnCtrl extends BasicBtnCtrl {
    constructor($scope, $timeout, $interval) {
        super($scope);
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.timePastMs_ = this.model.value;
        this.timeToSave_ = 0;
    }

    click() {
        var self = this;
        self.$interval.cancel(self.prIntrl_);
        if (!self.checked) {
            this.timePastMs_ = this.model.value;
            self.checked = true;
            self.prIntrl_ = this.$interval(function() {
                self.incTime_(saveIntrlMs);
            }, saveIntrlMs);
        } else {
            self.checked = false;
            self.saveBtnTime_(function(errorMsg) {
                // TODO: this needs to be generised.
                if (errorMsg) {
                    window.plugins.toast.showLongBottom(errorMsg);
                }
            });
        }
    }

    get timePastMs() {
        return !this.checked ? this.model.value : this.timePastMs_;
    }

    get timePastStr() {
        return time.getPastTimeStr(this.timePastMs);
    }

    incTime_(timePastMs) {
        this.timePastMs_ += timePastMs;
        this.timeToSave_ += timePastMs;
        localStorage.setItem(this.model._id, this.timeToSave_);
    }

    saveBtnTime_(onResult) {
        this.timeToSave_ = 0;
        var savedTime = parseInt(localStorage.getItem(this.model._id), 10);
        if (savedTime) {
            var self = this;
            this.model.click(savedTime, function(errorMsg) {
                onResult(errorMsg);
                if (!errorMsg) {
                    localStorage.removeItem(self.model._id);
                }
            });
        }
    }
};

app.controls.controller('NgTimerButtonController', ['$scope', '$timeout', '$interval',
    TimerBtnCtrl]);
