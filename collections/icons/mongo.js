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
    },

    getByTag: function(tag) {
        var regEx = tag ? '.*' + tag + '.*' : '.*';
        return Icons.find({tags: {$regex: regEx}});
    }
};

addModule('icons', lib);
