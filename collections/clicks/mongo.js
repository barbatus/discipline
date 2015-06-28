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

    getByButtonId: function(buttonId, opt_minDateMs, opt_maxDateMs) {
        var opt = {};
        if (opt_minDateMs || opt_maxDateMs) {
            opt.dateTimeMs = {
                $gte: opt_minDateMs || 0,
                $lte: opt_maxDateMs || Number.MAX_VALUE
            };
        }
        opt.buttonId = buttonId;
        return Clicks.find(opt);
    }
};

addModule('clicks', lib);
