app.controls.directive('ngClicksMonthCalendar', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgClicksMCalendarController',
        controllerAs: '$ctrl',
        scope: {
            btnId: '='
        },
        template: '\
            <div class="app-click-mcalendar" ng-class="{move: $ctrl.isOnMove}">\
                <div class="header">\
                    <h1>\
                        <div>{{$ctrl.title}}</div>\
                        <div ng-if="$ctrl.mClicks" class="clicks">\
                            <span>{{$ctrl.mClicks}}</span>\
                        </div>\
                    </h1>\
                    <button class="button button-clear icon ion-arrow-left-b left"\
                        ng-click="$ctrl.onPrev()">\
                    </button>\
                    <button class="button button-clear icon ion-arrow-right-b right"\
                        ng-click="$ctrl.onNext()">\
                    </button>\
                </div>\
                <div class="month">\
                    <div class="week-days">\
                        <div ng-repeat="day in $ctrl.days"\
                            class="day-name" style="width:{{$ctrl.dayWidth}}px">\
                            {{day}}\
                        </div>\
                    </div>\
                    <div class="weeks">\
                        <div ng-repeat="week in $ctrl.weeks" class="week">\
                            <div class="day" ng-repeat="day in week"\
                                ng-class="{out: day.isOut, clicked: day.nClicks}"\
                                style="width:{{$ctrl.dayWidth}}px">\
                                <div ng-if="day.nClicks > 1" class="day-clicks">\
                                    {{day.nClicks}}\
                                </div>\
                                <div class="day-number" style="font-size:{{$ctrl.fontSize}}px">\
                                    {{day.number}}\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        '
    };
}]);

class ClicksMCalendarCtrl {
    constructor($scope) {
        this.$scope = $scope;
        this.mMonth = moment([moment().year(), moment().month(), 1]);
        this.dayWidth = this.getWidth_();
        this.fontSize = this.getFont_();
        this.days = this.getDays_();
        this.render(this.$scope.btnId, this.mMonth);
        this.$scope.$emit('mcal.rendered');
    }

    onNext() {
        this.$scope.$emit('mcal.onNext');
        this.isOnMove = true;
        var self = this;
        setTimeout(function() {
            self.mMonth.add(1, 'months');
            self.render(self.$scope.btnId, self.mMonth);
            self.isOnMove = false;
            self.$scope.$apply();
            self.$scope.$emit('mcal.rendered');
        }, 200);
    }

    onPrev() {
        this.$scope.$emit('mcal.onPrev');
        this.isOnMove = true;
        var self = this;
        setTimeout(function() {
            self.mMonth.subtract(1, 'months');
            self.render(self.$scope.btnId, self.mMonth);
            self.isOnMove = false;
            self.$scope.$apply();
            self.$scope.$emit('mcal.rendered');
        }, 200);
    }

    render(btnId, mMonth) {
        var mDate = mMonth.clone();
        mDate.subtract(mMonth.day() + 1, 'days');
        var weeks = [];
        var week = [];
        var mClicks = 0;
        for (var i = 0; i < mMonth.day(); i++) {
            var mDay = mDate.add(1, 'days');
            var clicks = this.getDayClicks(btnId, mDay);
            week.push({
                isOut: true,
                nClicks: clicks.count(),
                number: mDay.format('DD'),
            });
            mClicks += clicks.count();
        }

        var mDay = mDate.add(1, 'days');
        while (mDate.month() == mMonth.month()) {
            if (mDay.day() == 0) {
                weeks.push(week);
                week = [];
            }
            var clicks = this.getDayClicks(btnId, mDay);
            week.push({
                isOut: false,
                nClicks: clicks.count(),
                number: mDay.format('DD')
            });
            mDay = mDate.add(1, 'days');
            mClicks += clicks.count();
        }

        while (mDay.day() != 0) {
            var clicks = this.getDayClicks(btnId, mDay);
            week.push({
                isOut: true,
                nClicks: clicks.count(),
                number: mDay.format('DD')
            });
            mDay = mDate.add(1, 'days');
            mClicks += clicks.count();
        }

        if (week.length) {
            weeks.push(week);
        }

        this.weeks = weeks;
        this.mClicks = mClicks;
    }

    getDayClicks(btnId, mDay) {
        var mUtcDay = mDay.clone().utc();
        var clicks = depot.buttons.getDayClicks(btnId, mUtcDay.valueOf());
        return clicks;
    }

    get title() {
       return this.mMonth.format('MMM YYYY');
    }

    getWidth_() {
        return utils.roundWidth((window.innerWidth - 22) / 7);
    }

    getFont_() {
        if (window.innerWidth <= 320) {
            return 25;
        } else {
            return utils.roundWidth(window.innerWidth / 320) * 25;
        }
    }

    getDays_() {
        var start = moment().day(0);
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push(start.format('ddd'));
            start.add(1, 'days');
        }
        return days;
    }
};

app.controls.controller('NgClicksMCalendarController', ['$scope',
    ClicksMCalendarCtrl]);
