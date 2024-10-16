const express = require('express')
const app = express();
const db = require('./models/index');
const Address = require('./routes/addressRoute');
const Course = require('./routes/courseRoute')
const Student = require("./routes/studentRoute");
const Question = require('./routes/questionRoute')
const Transaction = require('./routes/transaction');

app.use(express.json());

db.sequelize.authenticate()
    .then(() => {
        console.log('Connected')
    }).catch((error) => {
        console.log(error.message)
    })

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.use('/address', Address);
app.use('/course', Course);
app.use('/student', Student);
app.use('/transaction', Transaction);
app.use('/question', Question);

app.listen(5000, () => {
    console.log('App is running on port 5000')
})
