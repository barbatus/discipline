Meteor.startup(function() {
    if (!Buttons.find({}).count()) {
        var icon = Icons.findOne({});

        var btnId = Buttons.insert({
            name: 'btn1',
            type: depot.consts.Buttons.MULTI_CLICK,
            iconId: icon._id,
            groupName: 'first'
        });

        var dateTime = moment.utc().subtract(10, 'minutes');
        Clicks.insert({
            buttonId: btnId,
            dateTimeMs: dateTime.valueOf()
        });

        Buttons.insert({
            name: 'btn2',
            type: depot.consts.Buttons.ONCE_PER_DAY
        });

        BtnGroups.insert({
            name: 'sport'
        });

        BtnGroups.insert({
            name: 'food'
        });
    }
});
