require("dotenv").config();
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).send("Unauthorized");
  }
  next();
}
module.exports = { authenticateApiKey };
