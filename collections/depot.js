if (Meteor.isClient) {
    Buttons = new Ground.Collection('buttons', {
        connection: null,
        transform: function(button) {
            return BtnFactory.create(button);
        }
    });

    Clicks = new Ground.Collection('clicks', {
        connection: null,
        transform: function(click) {
            return new Click(click);
        }
    });
}

depot = {
    buttons: {
        get: function(ids) {
            return Buttons.find();
        },

        create: function(options) {
            Buttons.insert(options);
        },

        update: function(id, options) {
            Buttons.update(id, {
                $set: options
            });
        },

        addClick: function(buttonId, options) {
            depot.clicks.create(buttonId, options);
        },

        getClicks: function(buttonId) {
            return depot.clicks.getByButtonId(buttonId);
        },

        getCount: function(buttonId) {
            return depot.buttons.getClicks(buttonId).count();
        }
    },

    clicks: {
        create: function(buttonId, options) {
            Clicks.insert(_.extend({
                buttonId: buttonId,
            }, options));
        },

        get: function(ids) {
            return Clicks.find({_id: {$in: ids}});
        },

        getByButtonId: function(buttonId) {
            return Clicks.find({buttonId: buttonId});
        }
    },

    consts: {
        Buttons: {
            MULTI_CLICK: 1,
            ONCE_PER_DAY: 2
        }
    }
};

