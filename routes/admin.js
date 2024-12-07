const express = require('express');
const Router = express.Router();
const { addTrain, updateSeatAvailability } = require('../controllers/adminController');
const { authenticateApiKey } = require('../middlewares/apiKeyMiddleware');
Router.use(authenticateApiKey);
Router.post('/add-train', addTrain);
Router.post('/update-seat-availability', updateSeatAvailability);
module.exports = Router;
