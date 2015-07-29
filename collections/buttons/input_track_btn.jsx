if (Meteor.isClient) {

    class InputTrackBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
        }

        get type() {
            return depot.consts.Buttons.INPUT_TRACK;
        }

        get eventInfo() {
            return s.sprintf('%s(∑%d)', this.name, this.value);
        }

        getClickInfo(clickId) {
            var click = depot.clicks.getClick(clickId);
            return click.value;
        }

        static create(button) {
            return new InputTrackBtn(button || {});
        }
    };

    InputTrackBtn = InputTrackBtn_;
}
