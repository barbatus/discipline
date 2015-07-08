utils = {
    getAppIcon: function(name) {
        var icon = depot.icons.getAppIconByName(name);
        return icon && icon.src;
    },

    getDayDiff: function(dateTimeUTC) {
        var diffMS = moment.utc().diff(moment.utc(dateTimeUTC));
        var duration = moment.duration(diffMS);
        var days = duration.asDays();
        return days >> 0;
    }
};
