var uglify = require('uglifycss');

var init = function (thoughtpad) {
    thoughtpad.subscribe("css-postcompile-request", compile);
},

compile = function *(obj) {  
    if (!obj.contents) return;

    var ret,
        // By default we take the contents by string. The user can override this using the eventData config variable
        data = {};

    if (obj.thoughtpad.config && obj.thoughtpad.config.eventData && obj.thoughtpad.config.eventData['css-postcompile']) {
        data = obj.thoughtpad.config.eventData['css-postcompile'];
    }

    if (typeof obj.contents === "string") {
        ret = uglify.processString(obj.contents, data);
    } else {
        ret = uglify.processFiles(obj.contents, data);
    }

    yield obj.thoughtpad.notify("css-postcompile-complete", { contents: ret, name: obj.name });
};

module.exports = {
    init: init
};