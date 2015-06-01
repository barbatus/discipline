if (Meteor.isClient) {

    class BtnFactory_ {
        static create(type, btnCfg) {
            if (type == depot.consts.Buttons.MULTI_CLICK) {
                return MultiClickBtn.create(btnCfg);
            }

            if (type == depot.consts.Buttons.ONCE_PER_DAY) {
                return OpdTrackBtn.create(btnCfg);
            }
        }
    }

    BtnFactory = BtnFactory_;
}
