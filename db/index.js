const mongoose = require("mongoose");
const {DataBase_name , DataBase_password , DataBase_url} = process.env;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${DataBase_name}:${DataBase_password}@${DataBase_url}`);
}

const db = mongoose.connection;
db.on('error' , console.error.bind(console , "connection error"));
db.once("open" , function () {
    console.log("DataBase Connected")
})