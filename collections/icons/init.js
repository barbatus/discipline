Meteor.startup(function() {
    if (Meteor.isClient) {
        if (Icons.find().count() == 0) {
            _.forEach(depot.data.btn_icons, function(icon) {
                depot.icons.createBtnIcon(icon);
            });
            _.forEach(depot.data.app_icons, function(icon) {
                depot.icons.createAppIcon(icon);
            });
        }
    }
});
