const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkInTime: { type: Date, default: Date.now },
    location: { type: String }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
