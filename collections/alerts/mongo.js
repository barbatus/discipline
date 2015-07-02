if (Meteor.isClient) {
    var alerts_ = new Meteor.Collection('alerts', {
        connection: null,
        transform: function(alert) {
            return AlertFactory.create(alert.type, alert);
        }
    });

    Alerts = new Ground.Collection(alerts_);
}

var lib = {
    get: function(opt_read) {
        checkNullOrType(opt_read, Boolean);

        var opts = {};
        if (!_.isUndefined(opt_read)) {
            opts.read = opt_read;
        }
        return Alerts.find(opts, {sort: {dateTimeMs: -1}});
    },

    getAlert: function(entityId, type) {
        return Alerts.findOne({
            entityId: entityId,
            type: type
        }, {sort: {dateTimeMs: -1}});
    },

    create: function(btnId, data, type, msg) {
        return Alerts.insert({
            entityId: btnId,
            msg: msg,
            data: data,
            type: type,
            read: false,
            dateTimeMs: moment.utc().valueOf()
        });
    },

    setRead: function(ids) {
        check(ids, Array);

        Alerts.update({_id: {$in: ids}}, {
            $set: {read: true}
        });
    }
};

addModule('alerts', lib);
