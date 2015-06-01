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

        static create(button) {
            return new OpdTrackBtn(button || {});
        }
    }

    OpdTrackBtn = OpdTrackBtn_;
}
