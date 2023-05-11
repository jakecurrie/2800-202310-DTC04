const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const multer = require('multer');
const { spawn } = require('child_process');
require("dotenv").config();

const userModel = require('./model/users')

const upload = multer({ dest: 'uploads/' });

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

app.post('/api/classifyMeal', upload.single('image'), (req, res) => {
  const image = req.file;
  const python = spawn('python', ['./scripts/meal_classification.py', image.path]);

  let scriptOutput = "";
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script...');
      scriptOutput += data.toString();
  });

  python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      res.json(JSON.parse(scriptOutput));
  });
});

app.post('/api/fetchNutrition', (req, res) => {
  const meal = req.body.meal;
  const python = spawn('python', ['./scripts/fetch_nutrition.py', meal]);

  let scriptOutput = "";
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script...');
      scriptOutput += data.toString();
  });

  python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      res.json(JSON.parse(scriptOutput));
  });
});


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
