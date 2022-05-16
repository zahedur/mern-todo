const moment = require('moment-timezone');

exports.myDate = () => moment.tz(process.env.TIME_ZONE).format();
