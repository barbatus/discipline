client = {
    getAppIcon: function(name) {
        var icon = depot.icons.getAppIconByName(name);
        return icon && icon.src;
    }
};
