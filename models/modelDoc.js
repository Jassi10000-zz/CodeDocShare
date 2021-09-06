const mongoose = require('mongoose');
const mongoDocSchema = mongoose.Schema({
    value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ModelDoc', mongoDocSchema);