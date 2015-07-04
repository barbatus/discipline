if (Meteor.isClient) {

    class BtnFactory_ {
        static create(type, btnCfg, btnBits) {
            btnCfg.bits = btnBits;

            if (type == depot.consts.Buttons.MULTI_CLICK) {
                return MultiClickBtn.create(btnCfg);
            }

            if (type == depot.consts.Buttons.ONCE_PER_DAY) {
                return OpdTrackBtn.create(btnCfg);
            }

            if (type == depot.consts.Buttons.INPUT_TRACK) {
                return InputTrackBtn.create(btnCfg);
            }
        }
    }

    BtnFactory = BtnFactory_;
}
