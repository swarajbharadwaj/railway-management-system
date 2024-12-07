const trainModel = require("../models/trainModel");

const addTrain = async (req, res) => {
  const { train_name, source, destination, total_seats, available_seats } =
    req.body;
  try {
    const existingTrain = await trainModel.checkTrainExistsByName(train_name);
    if (existingTrain) {
      return res
        .status(400)
        .json({ message: "Train with this name already exists" });
    }

    const trainId = await trainModel.addTrain(
      train_name,
      source,
      destination,
      total_seats,
      available_seats
    );

    res.status(201).json({ message: "Train added successfully", trainId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding train", error: err.message });
  }
};

const updateSeatAvailability = async (req, res) => {
  const { train_name, available_seats } = req.body;

  try {
    const result = await trainModel.updateSeatAvailabilityByName(
      train_name,
      available_seats
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Seat availability updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Train not found with the specified name",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating seat availability",
      error: err.message,
    });
  }
};

module.exports = { addTrain, updateSeatAvailability };
