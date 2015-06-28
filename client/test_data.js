Meteor.startup(function() {

    function insertBtn(name, type, groupName, withIcon, nClicks, clickForToday) {
        var icon = null;
        if (withIcon) {
           var icons = depot.icons.getBtnIcons().fetch();
           var ind = ((icons.length - 1) * Math.random()) << 0;
           icon = icons[ind];
        }

        var btnId = depot.buttons.create({
            name: name,
            type: type,
            iconId: withIcon ? icon._id : null,
            groupName: groupName
        });

        var oldClicks = clickForToday ? nClicks - 1 : nClicks;

        if (oldClicks) {
            for (var i = 0; i < oldClicks; i++) {
                var days = (30 * Math.random()) << 0;
                insertClick(btnId, 'days', days);
            }
        }

        if (clickForToday) {
            insertClick(btnId, 'minutes', 10);
        }
    }

    function insertClick(btnId, timePart, timeVal) {
        var dateTime = moment.utc().subtract(timeVal, timePart);
        depot.clicks.create(btnId, {
            dateTimeMs: dateTime.valueOf()
        });
    }

    if (Buttons.find().count() == 0) {

        BtnGroups.insert({
            name: 'sport'
        });

        BtnGroups.insert({
            name: 'food'
        });

        insertBtn('btn1', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 5, true);
        insertBtn('btn2', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 10, false);
        insertBtn('btn3', depot.consts.Buttons.ONCE_PER_DAY, null, true, 1, true);
        insertBtn('btn4', depot.consts.Buttons.ONCE_PER_DAY, 'food', false, 0);
    }
});

