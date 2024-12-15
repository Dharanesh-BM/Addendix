const express = require('express');
const bcrypt = require('bcrypt');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

const router = express.Router();

// Get all representatives
router.get('/representatives', async (req, res) => {
    try {
        const representatives = await User.find({ role: 'representative' });
        res.status(200).json(representatives);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching representatives' });
    }
});

// Add representative
router.post('/representatives', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const representative = new User({ name, email, password: hashedPassword, role: 'representative' });
    try {
        await representative.save();
        res.status(201).json({ message: 'Representative added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding representative' });
    }
});

// Delete representative
router.delete('/representatives/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Representative deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting representative' });
    }
});

// Get attendance data
router.get('/attendance', async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('userId', 'name email');
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance data' });
    }
});

module.exports = router;
