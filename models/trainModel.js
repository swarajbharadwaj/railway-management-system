const db = require("../config/db");

const checkTrainExistsByName = async (train_name) => {
       const query = "SELECT * FROM trains WHERE train_name = ?";
       const [rows] = await db.execute(query, [train_name]);
       return rows.length > 0;  
     };

     const addTrain = async (train_name, source, destination, total_seats, available_seats) => {
       const query =
         "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)";
       const values = [train_name, source, destination, total_seats, available_seats];
     
       const [result] = await db.execute(query, values);
       return result.insertId;  
     };

const getTrainAvailability = async (source, destination) => {
  const query = "SELECT * FROM trains WHERE source = ? AND destination = ?";
  const [rows] = await db.execute(query, [source, destination]);
  return rows;
};

const getSeatAvailability = async (trainId) => {
  const query = "SELECT available_seats FROM trains WHERE id = ?";
  const [rows] = await db.execute(query, [trainId]);
  return rows.length > 0 ? rows[0].available_seats : null;
};

const updateSeatAvailabilityByName = async (train_name, available_seats) => {
       const query =
         "UPDATE trains SET available_seats = ? WHERE train_name = ?";
       const values = [available_seats, train_name];
     
       const [result] = await db.execute(query, values);
       return result;  
     };

module.exports = {
  checkTrainExistsByName,
  addTrain,
  getTrainAvailability,
  getSeatAvailability,
  updateSeatAvailabilityByName,
};
