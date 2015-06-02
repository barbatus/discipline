if (Meteor.isClient) {

    class Button_ {
        constructor(button) {
            this._id = button._id;
            this.name = button.name;
        }

        get count() {
            return depot.buttons.getTodayCount(this._id);
        }

        get clicked() {
            return false;
        }

        click(opt_value) {
            depot.buttons.addClick(this._id, opt_value);
        }

        save() {
            if (this._id) {
                depot.buttons.update(this._id, {
                    name: this.name
                });
                return;
            }

            depot.buttons.create({
                name: this.name,
                type: this.type,
                value: 0
            });
        }
    };

    // Exports

    BasicBtn = Button_;
}
