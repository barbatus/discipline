if (Meteor.isClient) {

    class InputTrackBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
            this.value = button.value || 0;
        }

        get type() {
            return depot.consts.Buttons.INPUT_TRACK;
        }

        click(value, opt_onResult) {
            check(value, Number);

            var self = this;
            super.click(value, function(errorMsg) {
                if (!errorMsg) {
                    if (_.isNumber(value)) {
                        depot.buttons.update(self._id, {
                            value: self.value + value
                        });
                    }
                }
                if (opt_onResult) {
                    opt_onResult(errorMsg);
                }
            });
        }

        static create(button) {
            return new InputTrackBtn(button || {});
        }
    };

    InputTrackBtn = InputTrackBtn_;
}
