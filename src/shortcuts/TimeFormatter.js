'use strict';

var TimeFormatter = function (timeIncludeSeconds) {
    var owner = this;

    owner.blocks = [];
    owner.timeIncludeSeconds = timeIncludeSeconds;
    owner.initBlocks();
};

TimeFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.blocks.push(2);
        owner.blocks.push(2);
        if (owner.timeIncludeSeconds)
            owner.blocks.push(2);
    },

    getBlocks: function () {
        return this.blocks;
    },

    getValidatedTime: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                if (index === 0) { // hours
                    var sub = value.slice(0, length),
                        sub0 = sub.slice(0, 1),
                        rest = value.slice(length);
                    if (parseInt(sub0, 10) > 2) {
                        sub = '0' + sub0
                    } else if (parseInt(sub, 10) > 23) {
                        sub = '23'
                    }
                } else if (index > 0) { // minutes
                    var sub = value.slice(0, length),
                        sub0 = sub.slice(0, 1),
                        rest = value.slice(length);
                    if (parseInt(sub0, 10) > 5) {
                        sub = '0' + sub0
                    } else if (parseInt(sub, 10) > 59) {
                        sub = '59'
                    }
                }
                result += sub;
                value = rest;
            }
        });

        return result;
    }
};

module.exports = TimeFormatter;
