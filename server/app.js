const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = require('./model/users')

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@artificialgains.9i0vt1r.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`)

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());


// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api', indexRouter);

app.post('/register', (req, res) => {
  console.log(req.body);
  const user = new userModel({
    'name' : req.body.name,
    'email' : req.body.email,
    'password' : bcrypt.hashSync(req.body.password, 10),
  }) 

  user.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))

  res.json({})
})

// Catch-all handler for any requests not caught by other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

main()

// Creating dummy user
// const user = new userModel({
//   name: 'test',
//   email: 'test@gmail.com',
//   password: 'test',
// })

// user.save()
// .then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// })
