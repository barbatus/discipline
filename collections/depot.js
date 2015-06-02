if (Meteor.isClient) {
    var buttons_ = new Meteor.Collection('buttons', {
        connection: null,
        transform: function(button) {
            return BtnFactory.create(button.type, button);
        }
    });

    Buttons = new Ground.Collection(buttons_);

    var clicks_ = new Meteor.Collection('clicks', {
        connection: null,
        transform: function(click) {
            return new Click(click);
        }
    });

    Clicks = new Ground.Collection(clicks_);
}

checkNullOrType = function(value, type) {
    check(value, Match.OneOf(null, Match.Optional(type)));
};

depot = {
    buttons: {
        get: function(ids) {
            return Buttons.find();
        },

        getTypes: function() {
            return [{
                type: depot.consts.Buttons.MULTI_CLICK,
                desc: 'Multi clicks per day button'
            }, {
                type: depot.consts.Buttons.ONCE_PER_DAY,
                desc: 'One click per day button'
            }, {
                type: depot.consts.Buttons.INPUT_TRACK,
                desc: 'Input and accumulate value'
            }];
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
    },

    clicks: {
        create: function(buttonId, options) {
            Clicks.insert(_.extend({
                buttonId: buttonId
            }, options));
        },

        get: function(ids) {
            return Clicks.find({_id: {$in: ids}});
        },

        getByButtonId: function(buttonId, opt_dateMs) {
            var opt = {};
            if (opt_dateMs) {
                opt.dateTimeMs = {$gte: opt_dateMs};
            }
            opt.buttonId = buttonId;
            return Clicks.find(opt);
        }
    },

    consts: {
        Buttons: {
            MULTI_CLICK: 1,
            ONCE_PER_DAY: 2,
            INPUT_TRACK: 3
        }
    }
};
