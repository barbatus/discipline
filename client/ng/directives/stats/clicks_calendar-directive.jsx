app.controls.directive('ngClicksCalendar', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgClicksCalendarController',
        controllerAs: '$ctrl',
        scope: {
            btnId: '='
        },
        template: '\
            <div class="app-click-calendar">\
                <div class="header">\
                    <h1>{{$ctrl.title}}</h1>\
                    <button class="button button-clear icon ion-arrow-left-b left" ng-click="$ctrl.onPrev()">\
                    </button>\
                    <button class="button button-clear icon ion-arrow-right-b right" ng-click="$ctrl.onNext()">\
                    </button>\
                </div>\
                <div class="month">\
                    <div class="week-days">\
                        <div ng-repeat="day in $ctrl.days"\
                            class="day-name" style="width:{{$ctrl.dayWidth}}px">\
                            {{day}}\
                        </div>\
                    </div>\
                    <div ng-repeat="week in $ctrl.weeks" class="week">\
                        <div ng-repeat="day in week"\
                            ng-class="{out: day.isOut, clicked: day.clicked}"\
                            class="day" style="width:{{$ctrl.dayWidth}}px">\
                            <div class="day-number">{{day.number}}</div>\
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
        this.month = moment([moment().year(), moment().month(), 1]);
        var start = moment().day(0);
        this.days = [];
        for (var i = 0; i < 7; i++) {
            this.days.push(start.format('ddd'));
            start.add(1, 'days');
        }
        this.render(this.$scope.btnId, this.month);
    }

    onNext() {
        this.month.add(1, 'months');
        this.render(this.$scope.btnId, this.month);
    }

    onPrev() {
        this.month.subtract(1, 'months');
        this.render(this.$scope.btnId, this.month);
    }

    render(btnId, mMonth) {
        var weeks = [];
        var mDate = mMonth.clone();
        mDate.subtract(mMonth.day() + 1, 'days');

        var week = [];
        for (var i = 0; i < mMonth.day(); i++) {
            var mDay = mDate.add(1, 'days');
            var clicks = this.getClicks(btnId, mDay);
            week.push({
                isOut: true,
                clicked: clicks.count(),
                number: mDay.format('DD'),
            });
        }

        var mDay = mDate.add(1, 'days');
        while (mDate.month() == mMonth.month()) {
            if (mDay.day() == 0) {
                weeks.push(week);
                week = [];
            }
            var clicks = this.getClicks(btnId, mDay);
            week.push({
                isOut: false,
                clicked: clicks.count(),
                number: mDay.format('DD')
            });
            mDay = mDate.add(1, 'days');
        }

        while (mDay.day() != 0) {
            var clicks = this.getClicks(btnId, mDay);
            week.push({
                isOut: true,
                clicked: clicks.count(),
                number: mDay.format('DD')
            });
            mDay = mDate.add(1, 'days');
        }

        if (week.length) {
            weeks.push(week);
        }

        this.weeks = weeks;
    }

    getClicks(btnId, mDay) {
        var clicks = depot.buttons.getDayClicks(btnId, mDay.valueOf());
        return clicks;
    }

    get title() {
       return this.month.format('MMMM YYYY');
    }

    get dayWidth() {
        var width = (window.innerWidth - 22) / 7;
        return width;
    }
};

app.controls.controller('NgClicksCalendarController', ['$scope',
    ClicksCalendarCtrl]);
