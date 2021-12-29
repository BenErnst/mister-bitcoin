
function store(key, value) {
    localStorage[key] = JSON.stringify(value);
    return JSON.parse(localStorage[key]);
}

function load(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

export const storageService = {
    store,
    load
}
