checkNullOrType = function(value, type) {
    check(value, Match.OneOf(null, Match.Optional(type)));
};
