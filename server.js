const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/index');
const Address = require('./Routes/addressRoute');
const Course = require("./Routes/courseRoute");
const Student = require("./Routes/studentRoute");
const cors = require('cors')

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(cors());
app.use(express.json());
// app.use(bodyParser)
  
app.use('/address', Address);
app.use('/course', Course);
app.use('/student', Student);

app.listen(5000, () => {
    console.log('App is running on port 3000')
})