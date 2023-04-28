const { connect } = require('mongoose');
const dotenv = require("dotenv");
const path = __dirname + "/.env"
dotenv.config({ path  })  
// THIS IS UBUNTU. WINDOWS USER : dotenv.config({ path: __dirname+ "\\.env" })
const connectionString = process.env['DB_CONNECTION'];
console.log({connectionString})
module.exports = () => {
  connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.info("Connected to Database");
    })
    .catch(() => {
      console.error("Failed to connect to Database");
    });

}