const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String
});

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    encryptPassword: function(password) {
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return ''
        }
    },
    isPasswordCorrect: function(password) {
        return this.encryptPassword(password) === this.hashed_password;
    }
};

module.exports = mongoose.model('User', userSchema);