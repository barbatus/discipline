Meteor.startup(function() {

    function insertBtn(name, type, groupName, withIcon, nClicks, opt_daysPeriod,
        opt_clickForToday, opt_sendAlerts) {
        var icon = null;
        if (withIcon) {
           var icons = depot.icons.getBtnIcons().fetch();
           var ind = ((icons.length - 1) * Math.random()) << 0;
           icon = icons[ind];
        }

        var bits = opt_sendAlerts ? [consts.BtnBits.SEND_ALERTS] : [];

        var btnId = depot.buttons.create({
            name: name,
            type: type,
            iconId: withIcon ? icon._id : null,
            groupName: groupName,
            bits: bits
        });

        var oldClicks = opt_clickForToday ? nClicks - 1 : nClicks;

        if (oldClicks) {
            for (var i = 0; i < oldClicks; i++) {
                var days = (opt_daysPeriod * Math.random()) << 0;
                insertClick(btnId, 'days', days);
            }
        }

        if (opt_clickForToday) {
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

        insertBtn('btn1', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 5, 30, true);
        insertBtn('btn2', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 10, 30, false);
        insertBtn('btn3', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 15, 180, false, true);
        insertBtn('btn4', depot.consts.Buttons.ONCE_PER_DAY, null, true, 1, 30, true);
        insertBtn('btn5', depot.consts.Buttons.ONCE_PER_DAY, 'food', false, 0);
    }
});

