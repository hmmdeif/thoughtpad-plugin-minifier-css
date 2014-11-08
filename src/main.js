var uglify = require('uglifycss'),
    _thoughtpad;

var init = function (thoughtpad) {
    _thoughtpad = thoughtpad;
    _thoughtpad.subscribe("css-postcompile-request", compile);
},

compile = function *(obj) {  
    if (!obj.contents) return;

    var ret;

    if (typeof obj.contents === "string") {
        ret = uglify.processString(obj.contents, obj.data);
    } else {
        ret = uglify.processFiles(obj.contents, obj.data);
    }

    yield _thoughtpad.notify("css-postcompile-complete", ret);
};

module.exports = {
    init: init
};