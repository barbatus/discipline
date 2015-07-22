if (Meteor.isClient) {

    class TimerBtn_ extends InputTrackBtn {
        constructor(button) {
            super(button);
            this.value = this.value || 0;
        }

        get type() {
            return depot.consts.Buttons.TIMER;
        }

        saveValue(value) {
            check(value, Number);

            depot.buttons.update(this._id, {
                value: value
            });
        }

        get eventInfo() {
            return s.sprintf('%s(%s)', this.name,
                time.getPastTimeStr(this.value));
        }

        static create(button) {
            return new TimerBtn(button || {});
        }
    };

    TimerBtn = TimerBtn_;
}
