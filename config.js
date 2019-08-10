module.exports = {
  secret: "ummahsecretkey",
  // database: "mongodb://dayaki:happy2day@ds253094.mlab.com:53094/ummah",
  database:
    "mongodb+srv://dayaki:happy2day@quotic-g6arj.mongodb.net/test?retryWrites=true&w=majority",
  // database: "mongodb://localhost:27017/qoutic",
  port: process.env.PORT || 3000
};
