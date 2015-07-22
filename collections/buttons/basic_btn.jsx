if (Meteor.isClient) {

    class Button_ {
        constructor(button) {
            this._id = button._id;
            this.name = button.name;
            this.iconId = button.iconId;
            this.groupName = button.groupName;
            this.note = button.note;
            this.bits_ = BasicBtn.getBitsObj(button.bits);
            this.value = button.value;
        }

        get count() {
            return depot.buttons.getTodayCount(this._id);
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

        click(opt_value, opt_onResult) {
            if (_.isFunction(opt_value)) {
                opt_onResult = opt_value;
                opt_value = null;
            }

            var dateMs = time.getDateMs();
            var clickId = this.addClick(opt_value);

            if (this.bits.SAVE_AS_EVENT) {
                var todayClick = depot.buttons.getEventClick(this._id, dateMs);
                var eventId = todayClick && todayClick.eventId || null;
                this.saveClick_(eventId, function(eventId) {
                    depot.clicks.update(clickId, {
                        eventId: eventId
                    });
                    if (opt_onResult) {
                        opt_onResult();
                    }
                }, function(errorMsg) {
                    depot.clicks.remove(clickId);
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
                value: this.value
            });
        }

        addClick(opt_value) {
            var dateTimeMs = moment().valueOf();
            return depot.buttons.addClick(this._id, dateTimeMs, opt_value);
        }

        // Saves click to Google calendar.
        saveClick_(eventId, onSuccess, opt_onError) {
            Calendar.saveClick(eventId, this.eventInfo,
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

        getDayInfo(utcDayMs) {
            var clicks = depot.buttons.getDayClicks(this._id, utcDayMs);
            return s.sprintf('%d times pressed', clicks.count());
        }

        get eventInfo() {
            return s.sprintf('%s(x%d)', this.name, this.count);
        }

        getDayClicks(utcDayMs) {
            return depot.buttons.getDayClicks(this._id, utcDayMs);
        }

        get lastClick() {
            return depot.buttons.getLastClick(this._id);
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
