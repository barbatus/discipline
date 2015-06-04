Meteor.startup(function() {
    if (Meteor.isClient) {
        if (Icons.find().count() == 0) {
            _.forEach(depot.data.icons, function(icon) {
                Icons.insert(icon);
            });
        }
    }
});
