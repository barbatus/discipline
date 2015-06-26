if (Meteor.isClient) {
    var icons_ = new Meteor.Collection('icons', {
        connection: null
    });

    Icons = new Ground.Collection(icons_);
}

var lib = {
    createBtnIcon: function(icon) {
        Icons.insert(_.extend(icon, {
            type: consts.Icons.BTN_ICON
        }));
    },

    createAppIcon: function(icon) {
        Icons.insert(_.extend(icon, {
            type: consts.Icons.APP_ICON
        }));
    },

    get: function() {
        return Icons.find();
    },

    getBtnIcon: function(iconId) {
        return Icons.findOne({
            _id: iconId,
            type: consts.Icons.BTN_ICON
        });
    },

    getAppIconByName: function(name) {
        return Icons.findOne({
            name: name,
            type: consts.Icons.APP_ICON
        });
    },

    findByTag: function(tag) {
        var regEx = tag ? ('.*' + tag + '.*') : '.*';
        return Icons.find({
            tags: {$regex: regEx, $options: 'i'},
            type: consts.Icons.BTN_ICON
        });
    }
};

addModule('icons', lib);
