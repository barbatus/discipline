class TaskRunner_ {
    constructor() {
        later.date.localTime();
    }

    runAtNight(callback) {
        later.setTimeout(function() {
            callback();
        }, later.parse.text('at 12:00 pm'));
    }

    runEveryMins(callback, mins) {
        later.setTimeout(function() {
            console.log('running task at every ' + mins);
            callback();
        }, later.parse.text(s.sprintf('every %d mins', mins)));
    }
};

TaskRunner = TaskRunner_;
