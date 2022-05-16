const bcrypt = require('bcrypt');

exports.hash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, (err, hash) => {
            return callback(err, hash);
        });
    });
};

exports.check = function(plainPass, hashPassword, callback) {
    bcrypt.compare(plainPass, hashPassword, function(err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
