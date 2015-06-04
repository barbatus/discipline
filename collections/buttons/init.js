Meteor.startup(function() {
    if (Meteor.isClient) {
        if (BtnTypes.find().count() == 0) {
            _.forEach(depot.data.btnTypes, function(btnType) {
                BtnTypes.insert(btnType);
            });
        }
    }
});
