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

            if (type = depot.consts.Buttons.TIMER) {
                return TimerBtn.create(btnCfg);
            }
        }

        static getType(button) {
            if (button) {
                if (button instanceof MultiClickBtn) {
                    return depot.consts.Buttons.MULTI_CLICK;
                }

                if (button instanceof OpdTrackBtn) {
                    return depot.consts.Buttons.ONCE_PER_DAY;
                }

                if (button instanceof InputTrackBtn) {
                    return depot.consts.Buttons.INPUT_TRACK;
                }

                if (button instanceof TimerBtn) {
                    return depot.consts.Buttons.TIMER;
                }
            }
            return depot.consts.Buttons.UNKNOWN;
        }
    };

    BtnFactory = BtnFactory_;
}
