const express = require("express");
const app = express();
const Server = require("http").createServer(app);
const router = require("./Routes/routes");
const dbConnect = require("./model/db");

//module
app.use(router);

//PORT
const PORT = 5050;
//Start Server
Server.listen(PORT, () => {
  console.log(`Server is listening http://localhost:${PORT}`);
  dbConnect.connect((err) => {
    if (err) return console.log(err);
  });
  console.log("DB Connected Succesfully...");
});
