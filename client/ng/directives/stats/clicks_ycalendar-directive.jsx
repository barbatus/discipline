app.controls.directive('ngClicksYearCalendar', ['$rootScope', function($rootScope) {
    return {
        controller: 'NgClicksYCalendarController',
        controllerAs: '$ctrl',
        scope: {
            btnId: '='
        },
        template: '\
            <div class="app-click-ycalendar" ng-class="{move: $ctrl.isOnMove}">\
                <div class="header">\
                    <h1>\
                        <div>{{$ctrl.title}}</div>\
                        <div ng-if="$ctrl.yClicks" class="clicks">\
                            <span>{{$ctrl.yClicks}}</span>\
                        </div>\
                    </h1>\
                    <button class="button button-clear icon ion-arrow-left-b left"\
                        ng-click="$ctrl.onPrev()">\
                    </button>\
                    <button class="button button-clear icon ion-arrow-right-b right"\
                        ng-click="$ctrl.onNext()">\
                    </button>\
                </div>\
                <div class="year">\
                    <div class="months">\
                        <div ng-repeat="month in $ctrl.months" class="month">\
                            <div class="month-name">{{month.name}}</div>\
                            <div ng-repeat="day in month.days" class="day"\
                                ng-class="{out: day.isOut, clicked: day.nClicks}"\
                                style="width:{{$ctrl.dayWidth}}px"\
                                ng-click="$ctrl.onDayClick(day, $event)">\
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

class ClicksYCalendarCtrl {
    constructor($scope, $timeout, $ionicPopover) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$ionicPopover = $ionicPopover;
        this.mYear = moment([moment().year(), 0, 1]);
        this.dayWidth = this.getWidth_();
        this.fontSize = this.getFont_();
        this.button = depot.buttons.getButton($scope.btnId);

        var self = this;
        $timeout(function() {
            self.render($scope.btnId, self.mYear);
            $scope.$emit('ycal.rendered');
        }, 100);
    }

    get popover() {
        if (!this.popover_) {
            var template = '\
                    <ion-popover-view class="ycal-day-info">\
                        <ion-content>{{dayInfo}}</ion-content>\
                    </ion-popover-view>\
                ';
            this.popover_ = this.$ionicPopover.fromTemplate(template, {
                scope: this.$scope
            });
        }
        return this.popover_;
    }

    onNext() {
        this.$scope.$emit('ycal.onNext');
        this.isOnMove = true;
        this.mYear.add(1, 'years');
        var self = this;
        this.$timeout(function() {
            self.render(self.$scope.btnId, self.mYear);
            self.$scope.$emit('ycal.rendered');
        }, 100);
    }

    onPrev() {
        this.$scope.$emit('ycal.onPrev');
        this.isOnMove = true;
        this.mYear.subtract(1, 'years');
        var self = this;
        this.$timeout(function() {
            self.render(self.$scope.btnId, self.mYear);
            self.$scope.$emit('ycal.rendered');
        }, 100);
    }

    render(btnId, mYear) {
        var yInd = mYear.year();
        var mInd = mYear.month();
        var months = [];
        var days = [];
        var mDate = mYear.clone();
        var monName = mDate.format('MMM');
        var yClicks = 0;
        // TODO: this needs to be optimized.
        while (mDate.year() == yInd) {
            if (mDate.month() != mInd) {
                months.push({
                    name: monName,
                    days: days
                });
                mInd = mDate.month();
                monName = mDate.format('MMM');
                days = [];
            }
            var clicks = this.getDayClicks_(btnId, mDate);
            days.push({
                nClicks: clicks.count(),
                number: mDate.format('DD'),
                utcDateMs: mDate.clone().utc().valueOf()
            });
            mDate.add(1, 'days');
            yClicks += clicks.count();
        }

        if (days.length) {
            months.push({
                name: monName,
                days: days
            });
        }

        this.months = months;
        this.yClicks = yClicks;

        return months;
    }

    onDayClick(day, $event) {
        if (day.nClicks) {
            this.$scope.dayInfo = this.button.getDayInfo(day.utcDateMs);
            this.popover.show($event);
        }
    }

    getDayClicks_(btnId, mDay) {
        var mUtcDay = mDay.clone().utc();
        var clicks = this.button.getDayClicks(mUtcDay.valueOf());
        return clicks;
    }

    get title() {
       return this.mYear.format('YYYY');
    }

    getWidth_() {
        return utils.roundWidth((window.innerWidth - 70 - 20) / 31);
    }

    getFont_() {
        if (window.innerWidth <= 568) {
            return 11;
        } else {
            return utils.roundWidth(window.innerWidth / 568) * 11;
        }
    }
};

app.controls.controller('NgClicksYCalendarController', ['$scope', '$timeout', '$ionicPopover',
    ClicksYCalendarCtrl]);
