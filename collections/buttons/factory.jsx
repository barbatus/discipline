if (Meteor.isClient) {

    class BtnFactory_ {
        static create(button) {
            if (button.type == depot.consts.Buttons.MULTI_CLICK) {
                return MultiClickBtn.create(button);
            }

            if (button.type == depot.consts.Buttons.ONCE_PER_DAY) {
                return OpdTrackBtn.create(button);
            }
        }
    }

    BtnFactory = BtnFactory_;
}
