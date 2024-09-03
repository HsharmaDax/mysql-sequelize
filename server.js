const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/index');
const Address = require('./routes/addressRoute');
const Course = require('./routes/courseRoute')
const Student = require("./routes/studentRoute");
const Transaction = require('./routes/transaction')
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

app.use('/address', Address);
app.use('/course', Course);
app.use('/student', Student);
app.use('/transaction',Transaction);

app.listen(5000, () => {
    console.log('App is running on port 3000')
})