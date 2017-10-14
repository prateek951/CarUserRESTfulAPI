const mongoose = require('mongoose');
const CarSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('Car',CarSchema);