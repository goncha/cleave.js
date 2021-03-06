var _ = require('underscore');
var TimeFormatter = require('../../src/shortcuts/TimeFormatter');
var timeGroups = require('../fixtures/time.json');

describe('TimeFormatter', function () {
    _.each(timeGroups, function (timeGroup) {
        describe('includeSeconds: ' + timeGroup.timeIncludeSeconds, function () {
            var timeFormatter = new TimeFormatter(timeGroup.timeIncludeSeconds);

            _.each(timeGroup.time, function (time) {
                it('should convert time ' + time[0] + ' to ' + time[1], function () {
                    timeFormatter.getValidatedTime(time[0]).should.eql(time[1]);
                });
            });
        });
    });
});
