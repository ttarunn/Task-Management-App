const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const userRoute = require('./controllers/authentication');
const taskRoute = require('./controllers/tasks')
const dotenv = require('dotenv');
const authentication = require('./middleware/middleware');
const bodyParser = require('body-parser');


dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false} ) );

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    //console.log("Connected to the database");
  })
  .catch((err) => {
    //console.log("Error in connection", err);
  });


app.use(express.json());

//api endpoint for user authentication
app.use('/user', userRoute);

//api endpoint for crud operations
app.use('/task', authentication, taskRoute);


app.use('/', (req, res) => {
    res.status(200).json({
        message:"Api Working"
    })
  });


app.listen(PORT, ()=> {
    //console.log(`Server is listening on ${PORT}`)
});


module.exports = app