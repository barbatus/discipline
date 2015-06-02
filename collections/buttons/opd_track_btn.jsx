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

        click(opt_value) {
            if (!this.clicked) {
                super.click(opt_value);
            }
        }

        static create(button) {
            return new OpdTrackBtn(button || {});
        }
    }

    OpdTrackBtn = OpdTrackBtn_;
}
