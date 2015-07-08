app.controls.directive('ngClicksCalendar', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgClicksCalendarController',
        controllerAs: '$ctrl',
        scope: {
            btnId: '='
        },
        template: '\
            <div class="app-click-calendar" ng-class="{move: $ctrl.isOnMove}">\
                <div class="header">\
                    <h1>\
                        <div>{{$ctrl.title}}</div>\
                        <div ng-if="$ctrl.monthClicks" class="clicks">\
                            <span>{{$ctrl.monthClicks}}</span>\
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

class ClicksCalendarCtrl {
    constructor($scope) {
        this.$scope = $scope;
        this.mMonth = moment([moment().year(), moment().month(), 1]);
        var start = moment().day(0);
        this.days = [];
        for (var i = 0; i < 7; i++) {
            this.days.push(start.format('ddd'));
            start.add(1, 'days');
        }
        this.render(this.$scope.btnId, this.mMonth);
        this.monthClicks = this.getMonthClicks(this.$scope.btnId, this.mMonth);
    }

    onNext() {
        this.isOnMove = true;
        var self = this;
        setTimeout(function() {
            self.mMonth.add(1, 'months');
            self.render(self.$scope.btnId, self.mMonth);
            self.monthClicks = self.getMonthClicks(self.$scope.btnId, self.mMonth);
            self.isOnMove = false;
            self.$scope.$apply();
        }, 200);
    }

    onPrev() {
        this.isOnMove = true;
        var self = this;
        setTimeout(function() {
            self.mMonth.subtract(1, 'months');
            self.render(self.$scope.btnId, self.mMonth);
            self.monthClicks = self.getMonthClicks(self.$scope.btnId, self.mMonth);
            self.isOnMove = false;
            self.$scope.$apply();
        }, 200);
    }

    render(btnId, mMonth) {
        var weeks = [];
        var mDate = mMonth.clone();
        mDate.subtract(mMonth.day() + 1, 'days');

        var week = [];
        for (var i = 0; i < mMonth.day(); i++) {
            var mDay = mDate.add(1, 'days');
            var clicks = this.getDayClicks(btnId, mDay);
            week.push({
                isOut: true,
                nClicks: clicks.count(),
                number: mDay.format('DD'),
            });
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
        }

        while (mDay.day() != 0) {
            var clicks = this.getDayClicks(btnId, mDay);
            week.push({
                isOut: true,
                nClicks: clicks.count(),
                number: mDay.format('DD')
            });
            mDay = mDate.add(1, 'days');
        }

        if (week.length) {
            weeks.push(week);
        }

        this.weeks = weeks;
    }

    getDayClicks(btnId, mDay) {
        var mUtcDay = mDay.clone().utc();
        var clicks = depot.buttons.getDayClicks(btnId, mUtcDay.valueOf());
        return clicks;
    }

    getMonthClicks(btnId, mMonth) {
        var mUtcMonth = mMonth.clone().utc();
        var startMs = mUtcMonth.valueOf();
        var endMs = mUtcMonth.add(1, 'months').subtract(1, 'days').valueOf();
        return depot.buttons.getClicks(btnId, startMs, endMs).count();
    }

    get title() {
       return this.mMonth.format('MMM YYYY');
    }

    get dayWidth() {
        var width = (window.innerWidth - 22) / 7;
        return width;
    }

    get fontSize() {
        if (window.innerWidth <= 320) {
            return 25;
        } else {
            return (window.innerWidth / 320) * 25;
        }
    }
};

app.controls.controller('NgClicksCalendarController', ['$scope',
    ClicksCalendarCtrl]);
