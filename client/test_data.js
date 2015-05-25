Meteor.startup(function() {
    if (!Buttons.find({}).count()) {
        var btnId = Buttons.insert({
            name: 'btn1',
            type: depot.consts.Buttons.MULTI_CLICK
        });

        Clicks.insert({
            buttonId: btnId
        });

        Buttons.insert({
            name: 'btn2',
            type: depot.consts.Buttons.ONCE_PER_DAY
        });
    }
});
