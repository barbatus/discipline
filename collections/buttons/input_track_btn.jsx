if (Meteor.isClient) {

    class InputTrackBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
            this.value = this.value || 0;
        }

        get type() {
            return depot.consts.Buttons.INPUT_TRACK;
        }

        saveValue(value) {
            check(value, Number);

            depot.buttons.update(this._id, {
                value: this.value + value
            });
        }

        addClick(opt_value) {
            var clickId = super.addClick(opt_value);
            this.saveValue(opt_value);
            return clickId;
        }

        get eventInfo() {
            return s.sprintf('%s(∑%d)', this.name, this.value);
        }

        static create(button) {
            return new InputTrackBtn(button || {});
        }
    };

    InputTrackBtn = InputTrackBtn_;
}
