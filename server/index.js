import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Cridaa API is running 🚀');
});

// MongoDB Connection
if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined.");
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
}

// Booking Schema
const bookingSchema = new mongoose.Schema({
    courtId: String,
    slotId: String,
    date: String,
    userName: String,
    userEmail: String,
    userPhone: String,
    createdAt: { type: Date, default: Date.now }
});

// Create compound index for availability check
bookingSchema.index({ courtId: 1, date: 1, slotId: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

const OPERATING_HOURS = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
];

// GET /api/slots?courtId=...&date=...
app.get('/api/slots', async (req, res) => {
    const { courtId, date } = req.query;
    if (!courtId || !date) {
        return res.status(400).json({ success: false, error: "Missing courtId or date" });
    }

    try {
        const courtBookings = await Booking.find({ courtId, date });

        const slots = OPERATING_HOURS.slice(0, -1).map((time, index) => {
            const nextTime = OPERATING_HOURS[index + 1];
            const slotId = `${courtId}-${date}-${time}`;
            const isBooked = courtBookings.some(b => b.slotId === slotId);

            return {
                id: slotId,
                startTime: time,
                endTime: nextTime,
                isBooked,
                courtId,
                date
            };
        });

        res.json({ success: true, data: slots });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/bookings
app.post('/api/bookings', async (req, res) => {
    const payload = req.body;
    // Basic validation
    if (!payload.courtId || !payload.date || !payload.slotId) {
        return res.status(400).json({ success: false, error: "Invalid booking data" });
    }

    try {
        // Check availability
        const exists = await Booking.findOne({
            courtId: payload.courtId,
            date: payload.date,
            slotId: payload.slotId
        });

        if (exists) {
            return res.json({ success: false, error: 'This slot has already been booked.' });
        }

        const newBooking = new Booking(payload);
        const savedBooking = await newBooking.save();

        // Map _id to id for frontend compatibility
        const responseData = savedBooking.toObject();
        responseData.id = responseData._id.toString();
        delete responseData._id;
        delete responseData.__v;

        res.json({ success: true, data: responseData });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ success: false, error: "Failed to create booking" });
    }
});

// GET /api/my-bookings?email=...
app.get('/api/my-bookings', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    try {
        // Case-insensitive regex match
        const userBookings = await Booking.find({
            userEmail: { $regex: new RegExp(`^${email}$`, 'i') }
        });

        const data = userBookings.map(b => {
            const obj = b.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/bookings/:id
app.delete('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Booking.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, error: "Booking not found" });
        }

        res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: "Failed to cancel booking" });
    }
});

// Only start server manually if NOT running in Vercel
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
