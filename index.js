require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
db.getConnection()
  .then(connection => {
    console.log("Database connected successfully.");
    connection.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1); 
  });
app.use(express.json());
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
