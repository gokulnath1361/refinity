const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'rented'], default: 'available' },
    numberOfBedrooms: Number,
    numberOfBathrooms: Number,
    nearbyHospitals: String,
    nearbyColleges: String,
});

module.exports = mongoose.model('Property', PropertySchema);
