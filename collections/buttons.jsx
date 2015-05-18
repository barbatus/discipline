if (Meteor.isClient) {

    class Button_ {
        constructor(button) {
            this._id = button._id;
            this.name = button.name;
        }

        get count() {
            return depot.buttons.getCount(this._id);
        }

        get clicked() {
            return depot.buttons.getCount(this._id) != 0;
        }

        click() {
            if (!this.clicked) {
                depot.buttons.addClick(this._id);
            }
        }

        save() {
            if (this._id) {
                depot.buttons.update(this._id, {
                    name: this.name,
                    count: this.count
                });
                return;
            }

            depot.buttons.create({
                name: this.name,
                count: this.count
            });
        }

        static create() {
            return new Button({
                count: 0
            });
        }
    };

    // Exports

    Button = Button_;
}
