const express = require('express');
const Router = express.Router();
const { userRegister, userLogin, bookSeat, getBookingDetails, getTrainAvailability, getSeatAvailability } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
Router.post('/user-registration', userRegister);
Router.post('/user-login', userLogin);
Router.post('/book-seat', authenticateToken, bookSeat);
Router.get('/get-booking-details', authenticateToken, getBookingDetails);
Router.get('/get-train-availability', getTrainAvailability);
Router.get('/get-seat-availability', getSeatAvailability);

module.exports = Router;
