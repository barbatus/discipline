if (Meteor.isClient) {
    var icons_ = new Meteor.Collection('icons', {
        connection: null
    });

    Icons = new Ground.Collection(icons_);
}

var lib = {
    get: function() {
        return Icons.find();
    },

    getIcon: function(iconId) {
        return Icons.findOne(iconId);
    }
};

addModule('icons', lib);
