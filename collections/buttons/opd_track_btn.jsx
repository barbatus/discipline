if (Meteor.isClient) {

    class OpdTrackBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
        }

        get type() {
            return depot.consts.Buttons.ONCE_PER_DAY;
        }

        get clicked() {
            return this.count != 0;
        }

        click(opt_value, opt_onResult) {
            if (!this.clicked) {
                super.click(opt_value, opt_onResult);
            }
        }

        static create(button) {
            return new OpdTrackBtn(button || {});
        }
    }

    OpdTrackBtn = OpdTrackBtn_;
}
