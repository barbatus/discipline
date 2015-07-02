if (Meteor.isClient) {

    class AlertFactory_ {
        static create(type, btnCfg) {
            if (type == depot.consts.Alerts.OUTDATED) {
                return OutBtnAlert.create(btnCfg);
            }
        }
    };

    AlertFactory = AlertFactory_;
}
