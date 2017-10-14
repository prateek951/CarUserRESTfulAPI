const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email : String,
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car'
    }]
});

module.exports = mongoose.model('User',UserSchema);