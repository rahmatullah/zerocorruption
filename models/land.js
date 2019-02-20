/**
 * @description model blueprint for device
 * @author Rahmatullah Darwish
 * @version 1.0
 * @type Model
 * @Email rahmat.darwish@gmail.com
 * @Date July 09 2018
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const landSchema = new Schema({
    land_id: {
        type: Number,
    },
    age: {
        type: Number
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    /* acre: {
        type: Number
    }, */
    created: {
        type: Number,
    },
    updated: {
        type: Number
    }
});

// Pre-save of user's hash password to database
landSchema.pre('save', function(next) {
    // created and updated date
    var now = new Date();
    this.updated = now.getTime();
    if (!this.created) {
        this.created = now.getTime();
    }
    next();
});
// Pre-save of user's hash password to database
landSchema.pre('update', function(next) {
    // created and updated date
    var now = new Date();
    this.updated = now.getTime();
    next();
});

module.exports = mongoose.model('land', landSchema);