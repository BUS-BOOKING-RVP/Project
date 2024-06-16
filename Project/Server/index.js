const express = require('express');
const mysql = require('mysql');
const cors=require('cors');
const config = require('config');
const userRoutesApp=require('./routes/user');


const port=config.get("port");;
const app = express();
app.use(cors());
app.use(express.json());



app.use("/user",userRoutesApp);

app.listen(port, () => {
    console.log(`Server running ...`);
  });