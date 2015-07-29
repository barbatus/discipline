if (Meteor.isClient) {

    class TimerBtn_ extends InputTrackBtn {
        constructor(button) {
            super(button);
        }

        get type() {
            return depot.consts.Buttons.TIMER;
        }

        getClickInfo(clickId) {
            var click = depot.clicks.getClick(clickId);
            return time.getPastTimeStr(click.value);
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
