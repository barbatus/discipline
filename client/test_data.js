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

        return btnId;
    }

    function insertClick(btnId, timePart, timeVal) {
        var dateTime = moment.utc().subtract(timeVal, timePart);
        depot.clicks.create(btnId, {
            dateTimeMs: dateTime.valueOf()
        });
    }

    if (!localStorage.getItem('loaded')) {
        localStorage.setItem('loaded', true);

        BtnGroups.insert({
            name: 'sport'
        });

        BtnGroups.insert({
            name: 'food'
        });

        insertBtn('btn1', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 5, 30, true);
        insertBtn('btn2', depot.consts.Buttons.MULTI_CLICK, 'sport', true, 10, 30, false);

        var btnId = insertBtn('btn3', depot.consts.Buttons.MULTI_CLICK, 'sport', true,
            15 /*all clicks*/, 180 /*days period*/, false /*today click*/, true /*alerts*/);
        depot.alerts.create(btnId, 3, consts.Alerts.OUTDATED, null);

        insertBtn('btn4', depot.consts.Buttons.ONCE_PER_DAY, null, true, 1, 30, true);
        insertBtn('btn5', depot.consts.Buttons.ONCE_PER_DAY, 'food', false, 0);
        insertBtn('btn6', depot.consts.Buttons.ONCE_PER_DAY, 'food', true, 0);
        insertBtn('btn7', depot.consts.Buttons.INPUT_TRACK, 'test', true, 1, 0, true);
        insertBtn('btn8', depot.consts.Buttons.MULTI_CLICK, 'test', true, 1, 30, false);
    }
});

