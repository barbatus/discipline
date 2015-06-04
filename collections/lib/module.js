collections = {};

addModule = function(name, module) {
    if (!collections[name]) {
        collections[name] = {};
    }
    _.extend(collections[name], module);

    return collections[name];
};

data = {};

addData = function(name, module) {
    if (!data[name]) {
        data[name] = {};
    }
    _.extend(data[name], module);
};
