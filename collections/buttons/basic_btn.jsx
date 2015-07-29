if (Meteor.isClient) {

    class Button_ {
        constructor(button) {
            this._id = button._id;
            this.name = button.name;
            this.iconId = button.iconId;
            this.groupName = button.groupName;
            this.note = button.note;
            this.bits_ = BasicBtn.getBitsObj(button.bits);
            this.type_ = button.type;
        }

        get count() {
            return depot.buttons.getTodayCount(this._id);
        }

        get value() {
            return depot.buttons.getTodayValue(this._id);
        }

        get clicked() {
            return false;
        }

        get icon() {
            var icon = depot.icons.getBtnIcon(this.iconId);
            return icon && icon.src;
        }

        get bits() {
            return this.bits_;
        }

        get type() {
            return this.type_;
        }

        click(opt_value, opt_onResult) {
            if (_.isFunction(opt_value)) {
                opt_onResult = opt_value;
                opt_value = null;
            }

            var dateMs = time.getDateMs();
            var clickId = this.addClick(opt_value);

            if (this.bits.SAVE_AS_EVENT) {
                var self = this;
                var todayClick = depot.buttons.getEventClick(this._id, dateMs);
                var eventId = todayClick && todayClick.eventId || null;
                this.saveEvent_(eventId, function(eventId) {
                    depot.clicks.update(clickId, {
                        eventId: eventId
                    });
                    if (opt_onResult) {
                        opt_onResult();
                    }
                }, function(errorMsg) {
                    self.removeClick_(clickId);
                    if (opt_onResult) {
                        opt_onResult(errorMsg);
                    }
                });
                return;
            }
            setTimeout(function() {
                if (opt_onResult) {
                    opt_onResult();
                }
            });
        }

        save() {
            if (this._id) {
                depot.buttons.update(this._id, {
                    name: this.name,
                    iconId: this.iconId,
                    groupName: this.groupName,
                    note: this.note,
                    bits: BasicBtn.getBitsArray(this.bits_)
                });
                return;
            }

            depot.buttons.create({
                name: this.name,
                type: this.type,
                iconId: this.iconId,
                groupName: this.groupName,
                note: this.note,
                bits: BasicBtn.getBitsArray(this.bits_),
                archived: false
            });
        }

        archive() {
            depot.buttons.update(this._id, {
                archived: true
            });
        }

        addClick(opt_value) {
            var dateTimeMs = moment().valueOf();
            return depot.buttons.addClick(this._id, dateTimeMs, opt_value);
        }

        removeClick(clickId, opt_onResult) {
            var click = depot.clicks.getClick(clickId);
            this.removeClick_(clickId);

            if (this.bits.SAVE_AS_EVENT) {
                var dateMs = time.getDateMs();
                var todayClick = depot.buttons.getEventClick(this._id, dateMs);
                if (todayClick.eventId) {
                    this.saveEvent_(todayClick.eventId, function(eventId) {
                            if (opt_onResult) {
                                opt_onResult();
                            }
                        }, function(errorMsg) {
                            depot.buttons.addClick(click.buttonId, click.dateTimeMs,
                                click.value, click.eventId);
                            if (opt_onResult) {
                                opt_onResult(errorMsg);
                            }
                        });
                    return;
                }
            }
            setTimeout(function() {
                if (opt_onResult) {
                    opt_onResult();
                }
            });
        }

        removeClick_(clickId) {
            depot.clicks.remove(clickId);
        }

        // Saves click to Google calendar.
        saveEvent_(eventId, onSuccess, opt_onError) {
            Calendar.saveEvent(eventId, this.eventInfo,
                moment().valueOf(), this.note,
                function(eventId) {
                    onSuccess(eventId);
                },
                function(errorMsg) {
                    if (opt_onError) {
                        opt_onError(errorMsg);
                    }
                });
        }

        getClicks(startDateMs) {
            check(startDateMs, Number);

            return depot.buttons.getClicks(this._id, startDateMs);
        }

        getDayClicks(utcDayMs) {
            return depot.buttons.getDayClicks(this._id, utcDayMs);
        }

        getTodayClicks() {
            return depot.buttons.getTodayClicks(this._id);
        }

        getClickInfo(clickId) {
            var click = depot.clicks.getClick(clickId);
            return moment(click.dateTimeMs).format('LT');
        }

        getDayInfo(utcDayMs) {
            var clicks = depot.buttons.getDayClicks(this._id, utcDayMs);
            return s.sprintf('%d times pressed', clicks.count());
        }

        get eventInfo() {
            return s.sprintf('%s(x%d)', this.name, this.count);
        }

        get lastClick() {
            return depot.buttons.getLastClick(this._id);
        }

        static getAll() {
            return depot.buttons.get({archived: false});
        }

        static getBitsArray(bitsObj) {
            check(bitsObj, Object);

            var bits = [];
            for (var bit in depot.consts.BtnBits) {
                if (bitsObj[bit]) {
                    bits.push(depot.consts.BtnBits[bit]);
                }
            }
            return bits;
        }

        static getBitsObj(bits) {
            check(bits, Array);

            var bitsObj = {};
            for (var i = 0; i < bits.length; i++) {
                for (var bit in depot.consts.BtnBits) {
                    if (bits[i] == depot.consts.BtnBits[bit]) {
                        bitsObj[bit] = true;
                    }
                }
            }
            return bitsObj;
        }
    };

    // Exports

    BasicBtn = Button_;
}
