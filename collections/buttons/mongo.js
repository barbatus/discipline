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

    var groups_ = new Meteor.Collection('groups', {
        connection: null
    });

    BtnGroups = new Ground.Collection(groups_);
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

    getButton: function(btnId) {
        return Buttons.findOne(btnId);
    },

    getTypes: function() {
        return BtnTypes.find({});
    },

    getGroups: function() {
        return BtnGroups.find({});
    },

    findGroups: function(name) {
        return BtnGroups.find({name: {
            $regex: ('.*' + name + '.*'),
            $options: 'i'
        }});
    },

    create: function(options) {
        if (options.groupName) {
            var groups = lib.findGroups(options.groupName);
            if (!groups.count()) {
                lib.addGroup(options.groupName);
            }
        }
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

    addGroup: function(name) {
        check(name, String);

        BtnGroups.insert({name: name.toLowerCase()});
    },

    getClicks: function(buttonId, opt_minDateMs, opt_maxDateMs) {
        return depot.clicks.getByButtonId(buttonId, opt_minDateMs, opt_maxDateMs);
    },

    getDayClicks: function(buttonId, dateMs) {
        check(dateMs, Number);

        var dayMs = moment(dateMs).utc().valueOf();
        return depot.buttons.getClicks(buttonId, dayMs, dayMs + 24 * 60 * 60 * 1000);
    },

    getTodayCount: function(buttonId) {
        var now = moment();
        var dateMs = moment.utc([now.year(), now.month(),
            now.date() - 1]).valueOf();
        return depot.buttons.getClicks(buttonId, dateMs).count();
    }
};

addModule('buttons', lib);
