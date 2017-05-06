"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = combine;
/**
 * Created by lamho on 2017/3/30.
 */
function combine(object1, object2) {

    var newDefaultOpt = {};

    function copy(obj, key) {
        var newObj = {};

        if (!object2[key]) {
            return object1[key];
        }

        for (var _k in obj) {
            if (object2[key][_k] == null || object2[key][_k] == undefined) {
                newObj[_k] = obj[_k];
            } else {
                newObj[_k] = object2[key][_k];
            }
        }
        return newObj;
    };

    for (var k in object1) {
        newDefaultOpt[k] = copy(object1[k], k);
    }
    return newDefaultOpt;
}