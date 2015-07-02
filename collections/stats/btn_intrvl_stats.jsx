var statsPeriod = 6; // months
var viableNum = 5; // clicks

class BtnIntrvlStats_ {
    constructor(btnId) {
        this.btnId_ = btnId;
    }

    get next() {
        if (!this.init_) {
            this.calc_();
            this.init_ = true;
        }
        return this.intrvlMs_ ? (this.lastDateMs_ + this.intrvlMs_) : Number.MAX_VALUE;
    }

    get period() {
        if (!this.init_) {
            this.calc_();
            this.init_ = true;
        }
        return this.intrvlMs_ / (24 * 60 * 60 * 1000);
    }

    calc_() {
        var nowUtcMs = moment.utc().valueOf();
        var startDateMs = moment.utc().subtract(statsPeriod, 'months').valueOf();
        var clicks = depot.buttons.getClicks(this.btnId_,
            startDateMs, nowUtcMs).fetch();
        var dateMap = {};
        var statsDates = [];
        var dateLen = 0;
        for (var i = 0; i < clicks.length; i++) {
            var click = clicks[i];
            var mDate = moment.utc(click.dateTimeMs);
            var dateMs = mDate.startOf('day').valueOf();
            if (!dateMap[dateMs]) {
                dateMap[dateMs] = true;
                statsDates.push(dateMs);
                dateLen++;
            }
            if (dateLen == viableNum) {
                break;
            }
        }
        this.intrvlMs_ = null;
        if (dateLen == viableNum) {
            var diffSum = 0;
            for (var i = 0; i < dateLen - 1; i++) {
                diffSum += (statsDates[i] - statsDates[i + 1]);
            }
            this.intrvlMs_ = diffSum / (dateLen - 1);
            this.lastDateMs_ = statsDates[0];
        }
    }
};

BtnIntrvlStats = BtnIntrvlStats_;
