time = {
    getDateMs: function() {
        var now = moment();
        var dateMs = moment([now.year(), now.month(), now.date()]).valueOf();
        return dateMs;
    },

    getPastTimeStr: function(timeMs) {
        var mDur = moment.duration(timeMs);
        var hours = mDur.asHours() >> 0;
        if (hours) {
            return s.sprintf('%dh %dm %ds',
                hours, mDur.minutes(), mDur.seconds());
        }
        var mins = mDur.asMinutes() >> 0;
        if (mins) {
            return s.sprintf('%dm %ds', mins, mDur.seconds());
        }
        return s.sprintf('%ds', mDur.seconds());
    }
};
