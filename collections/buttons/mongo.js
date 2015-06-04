if (Meteor.isClient) {
    var buttons_ = new Meteor.Collection('buttons', {
        connection: null,
        transform: function(button) {
            return BtnFactory.create(button.type, button);
        }
    });

    Buttons = new Ground.Collection(buttons_);

    var types_ = new Meteor.Collection('types', {
        connection: null
    });

    BtnTypes = new Ground.Collection(types_);
}

Meteor.startup(function() {
    if (Meteor.isClient) {
        if (BtnTypes.find().count() == 0) {
            _.forEach(data.btnTypes, function(btnType) {
                BtnTypes.insert(btnType);
            });
        }
    }
});

var lib = {
    get: function(ids) {
        return Buttons.find();
    },

    getTypes: function() {
        return BtnTypes.find({});
    },

    create: function(options) {
        Buttons.insert(options);
    },

    update: function(id, options) {
        Buttons.update(id, {
            $set: options
        });
    },

    addClick: function(buttonId, opt_value) {
        checkNullOrType(opt_value, Number);

        var dateTimeMs = moment.utc().valueOf();
        depot.clicks.create(buttonId, {
            value: opt_value,
            dateTimeMs: dateTimeMs
        });
    },

    getClicks: function(buttonId, opt_dateMs) {
        return depot.clicks.getByButtonId(buttonId, opt_dateMs);
    },

    getTodayCount: function(buttonId, opt_dateMs) {
        var now = moment();
        var dateMs = moment.utc([now.year(), now.month(),
            now.date() - 1]).valueOf();
        return depot.buttons.getClicks(buttonId, dateMs).count();
    }
};

addModule('buttons', lib);
