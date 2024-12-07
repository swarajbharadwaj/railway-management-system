const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const trainModel = require("../models/trainModel");
const bookingModel = require("../models/bookingModel");
const db = require("../config/db");
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.checkUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.addUser(username, email, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      userId,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.verifyLogin(email, password);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

const getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await trainModel.getTrainAvailability(source, destination);
    if (trains.length === 0) {
      return res
        .status(404)
        .json({ message: "No trains found between these stations" });
    }
    res.status(200).json(trains);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching train availability",
      error: err.message,
    });
  }
};

const getSeatAvailability = async (req, res) => {
  const { train_id } = req.query;
  try {
    const availableSeats = await trainModel.getSeatAvailability(train_id);
    if (availableSeats === null) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.status(200).json({ available_seats: availableSeats });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching seat availability",
      error: err.message,
    });
  }
};

const bookSeat = async (req, res) => {
  const { userId, trainId } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const train = await bookingModel.checkSeatAvailability(trainId);

    if (train.length === 0) {
      return res.status(404).json({ message: "Train not found" });
    }

    const availableSeats = train[0].available_seats;

    if (availableSeats <= 0) {
      return res
        .status(400)
        .json({ message: "No available seats for booking" });
    }

    await bookingModel.updateSeatAvailability(trainId);

    await bookingModel.insertBooking(userId, trainId);

    await connection.commit();

    res.status(200).json({ message: "Seat booked successfully" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "Error booking seat", error: err.message });
  } finally {
    connection.release();
  }
};

const getBookingDetails = async (req, res) => {
  const { userId } = req.query;
  try {
    const bookings = await bookingModel.getBookingDetails(userId);
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching booking details", error: err.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getTrainAvailability,
  getSeatAvailability,
  bookSeat,
  getBookingDetails,
};
