if (Meteor.isClient) {

    class MultiClickBtn_ extends BasicBtn {
        constructor(button) {
            super(button);
        }

        get type() {
            return depot.consts.Buttons.MULTI_CLICK;
        }

        static create(button) {
            return new MultiClickBtn(button || {});
        }
    };

    MultiClickBtn = MultiClickBtn_;
}
