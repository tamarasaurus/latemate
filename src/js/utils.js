'use strict';
var _ = require('underscore');
module.exports = {
        replaceStringInKey: function(obj, toReplace, replaceWith) {
                var stripped = {};
                _.each(obj, function(value, key) {
                    key = key.replace(toReplace, replaceWith);
                    stripped[key] = value;
                });
                return stripped;
            }
 };