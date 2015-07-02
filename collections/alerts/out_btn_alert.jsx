if (Meteor.isClient) {

    class OutBtnAlert_ {
        constructor(alert) {
            this.type = alert.type;
            this.btnId_ = alert.entityId;
            this.period_ = alert.data;
        }

        get period() {
            return this.period_;
        }

        get button() {
            return depot.buttons.getButton(this.btnId_);
        }

        get lastDateStr() {
            var button = depot.buttons.getButton(this.btnId_);
            var mUtcDate = moment.utc(button.lastClick.dateTimeMs);
            return mUtcDate.local().format('MM/DD/YYYY');
        }

        static create(alert) {
            return new OutBtnAlert(alert || {});
        }
    };

    OutBtnAlert = OutBtnAlert_;
}
