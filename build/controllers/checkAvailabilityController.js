"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailability = exports.fetchRoomsForHotel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fetchRoomsForHotel = async (req, res) => {
    const { hotelId } = req.params;
    try {
        const rooms = await prisma.room.findMany({
            where: {
                hotelId: Number(hotelId)
            }
        });
        res.status(200).json(rooms);
    }
    catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Failed to fetch rooms. Please try again later.' });
    }
};
exports.fetchRoomsForHotel = fetchRoomsForHotel;
const checkAvailability = async (req, res) => {
    const { hotelId, checkInDate, checkOutDate } = req.body;
    // checkInDate ve checkOutDate arasında rezervasyon var mı kontrol eder
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
        return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }
    else if (checkIn < new Date()) {
        return res.status(400).json({ error: 'Check-in date must be in the future' });
    }
    // eğer otel müsaitse true döner
    try {
        const availableRooms = await prisma.room.findMany({
            where: {
                hotelId: Number(hotelId),
                NOT: {
                    bookings: {
                        some: {
                            OR: [
                                { checkInDate: { lte: checkOutDate } },
                                { checkOutDate: { gte: checkInDate } }
                            ]
                        }
                    }
                }
            }
        });
        res.status(200).json({ available: availableRooms });
        // eğer müsait değilse false döner
        if (availableRooms.length === 0) {
            res.status(200).json({ available: false });
        }
    }
    catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Failed to check availability. Please try again later.' });
    }
};
exports.checkAvailability = checkAvailability;
//# sourceMappingURL=checkAvailabilityController.js.map