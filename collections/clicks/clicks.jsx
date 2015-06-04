if (Meteor.isClient) {
    class Click_ {
        constructor(click) {
            _.extend(this, click);
        }
    };

    // Exports.

    Click = Click_;
}
