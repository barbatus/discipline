class OutAlertTask_ {
    run() {
        var buttons = depot.buttons.get([consts.Buttons.MULTI_CLICK,
            consts.Buttons.ONCE_PER_DAY]);
        var self = this;
        buttons.forEach(function(button) {
            var lastAlert = depot.alerts.getAlert(button._id,
                consts.Alerts.OUTDATED);
            if (!lastAlert || lastAlert.dateTimeMs < button.lastClick.dateTimeMs) {
                var stats = new BtnIntrvlStats(button._id);
                if (stats.next < moment.utc().valueOf()) {
                    depot.alerts.create(button._id, stats.period,
                        consts.Alerts.OUTDATED, null);
                }
            }
        });
    }
};

OutAlertTask = OutAlertTask_;
