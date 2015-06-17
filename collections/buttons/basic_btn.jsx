if (Meteor.isClient) {

    class Button_ {
        constructor(button) {
            this._id = button._id;
            this.name = button.name;
            this.iconId = button.iconId;
            this.groupName = button.groupName;
        }

        get count() {
            return depot.buttons.getTodayCount(this._id);
        }

        get clicked() {
            return false;
        }

        get icon() {
            var icon = depot.icons.getIcon(this.iconId);
            return icon && icon.src;
        }

        click(opt_value) {
            depot.buttons.addClick(this._id, opt_value);
        }

        save() {
            if (this._id) {
                depot.buttons.update(this._id, {
                    name: this.name,
                    iconId: this.iconId,
                    groupName: this.groupName
                });
                return;
            }

            depot.buttons.create({
                name: this.name,
                type: this.type,
                iconId: this.iconId,
                groupName: this.groupName,
                value: 0
            });
        }
    };

    // Exports

    BasicBtn = Button_;
}
