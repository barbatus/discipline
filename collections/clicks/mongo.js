if (Meteor.isClient) {
    var clicks_ = new Meteor.Collection('clicks', {
        connection: null,
        transform: function(click) {
            return new Click(click);
        }
    });

    Clicks = new Ground.Collection(clicks_);
}

var lib = {
    create: function(buttonId, options) {
        return Clicks.insert(_.extend({
            buttonId: buttonId
        }, options));
    },

    get: function(ids) {
        return Clicks.find({_id: {$in: ids}});
    },

    getClick: function(clickId) {
        return Clicks.findOne(clickId);
    },

    getByButtonId: function(buttonId, opt_minDateMs, opt_maxDateMs) {
        var opt = {};
        if (opt_minDateMs || opt_maxDateMs) {
            opt.dateTimeMs = {
                $gte: opt_minDateMs || 0,
                $lte: opt_maxDateMs || Number.MAX_VALUE
            };
        }
        opt.buttonId = buttonId;
        return Clicks.find(opt, {sort: {dateTimeMs: -1}});
    },

    remove: function(clickId) {
        check(clickId, String);

        Clicks.remove(clickId);
    },

    update: function(clickId, options) {
        check(clickId, String);

        Clicks.update(clickId, {
            $set: options
        });
    }
};

addModule('clicks', lib);
