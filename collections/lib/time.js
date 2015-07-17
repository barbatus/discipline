time = {
    getDateMs: function() {
        var now = moment();
        var dateMs = moment([now.year(), now.month(), now.date()]).valueOf();
        return dateMs;
    }
};
