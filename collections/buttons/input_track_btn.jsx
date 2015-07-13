if (Meteor.isClient) {

    class InputTrackBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
            this.value = button.value || 0;
        }

        get type() {
            return depot.consts.Buttons.INPUT_TRACK;
        }

        click(value) {
            check(value, Number);

            super.click(value);
            if (_.isNumber(value)) {
                depot.buttons.update(this._id, {
                    value: this.value + value
                });
            }
        }

        static create(button) {
            return new InputTrackBtn(button || {});
        }
    };

    InputTrackBtn = InputTrackBtn_;
}
