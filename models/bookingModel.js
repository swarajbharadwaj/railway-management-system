const db = require("../config/db");

const bookSeat = async (userId, trainId) => {
  const query = "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)";
  await db.execute(query, [userId, trainId]);
};

const getBookingDetails = async (userId) => {
  const query = "SELECT * FROM bookings WHERE user_id = ?";
  const [rows] = await db.execute(query, [userId]);
  return rows;
};

const checkSeatAvailability = async (trainId) => {
  const query = "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE";
  const [train] = await db.execute(query, [trainId]);
  return train;
};

const updateSeatAvailability = async (trainId) => {
  const query =
    "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?";
  await db.execute(query, [trainId]);
};

const insertBooking = async (userId, trainId) => {
  const query = "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)";
  await db.execute(query, [userId, trainId]);
};

module.exports = {
  checkSeatAvailability,
  updateSeatAvailability,
  insertBooking,
  bookSeat,
  getBookingDetails,
};
