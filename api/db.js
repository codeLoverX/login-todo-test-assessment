const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const path = __dirname + "/.env"
dotenv.config({ path  })  
// THIS IS UBUNTU. WINDOWS USER : dotenv.config({ path: __dirname+ "\\.env" })
const connectionString = process.env['DB_CONNECTION'];
console.log({connectionString})
module.exports = async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res) => {
    console.log("connected successfully")
  }).catch((err) => {
    console.log("error")
  });;

  return mongoose
};