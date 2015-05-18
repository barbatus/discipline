Meteor.startup(function() {
    if (!Buttons.find({}).count()) {
        var btnId = Buttons.insert({
            name: 'btn1'
        });

        Clicks.insert({
            buttonId: btnId
        });

        Buttons.insert({
            name: 'btn2'
        });
    }
});
