Meteor.startup(function() {
    if (!Buttons.find({}).count()) {
        Buttons.insert({
            title: 'btn1'
        });
        Buttons.insert({
            title: 'btn2'
        });
    }
});
