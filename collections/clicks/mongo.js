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
};

addModule('clicks', lib);
