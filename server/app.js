const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const multer = require('multer');
const { spawn } = require('child_process');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const userModel = require('./model/users');
const { error } = require('console');
const upload = multer({ dest: 'uploads/' });

const app = express();

// Enable CORS for cross-origin requests
app.use(cors({ origin: 'https://artificialgains.uw.r.appspot.com', credentials: true, optionSuccessStatus: 200,})) 

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function accessSecretVersion(secretName) {
  const name = `projects/artificialgains/secrets/${secretName}/versions/latest`;
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name,
  });
  const secret = version.payload.data.toString();
  return secret;
}

async function main() {
  const mongodbUser = await accessSecretVersion('MONGODB_USER');
  const mongodbPassword = await accessSecretVersion('MONGODB_PASSWORD');
  const mongodbDB = await accessSecretVersion('MONGODB_DB');
  const sessionSecret = await accessSecretVersion('SESSION_SECRET');

  await mongoose.connect(`mongodb+srv://${mongodbUser}:${mongodbPassword}@artificialgains.9i0vt1r.mongodb.net/${mongodbDB}?retryWrites=true&w=majority`)

  let mongoStore = MongoStore.create({ 
    mongoUrl: `mongodb+srv://${mongodbUser}:${mongodbPassword}@artificialgains.9i0vt1r.mongodb.net/${mongodbDB}?retryWrites=true&w=majority`,
    collectionName: "sessions",
    crypto: {
      secret: sessionSecret
    }
  })

  app.use(
    session({
      secret: sessionSecret,
      store: mongoStore,
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  );

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

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    if (code !== 0) {
      res.status(500).send('Error executing Python script');
    } else {
      try {
        res.json(JSON.parse(scriptOutput));
      } catch (e) {
        console.error("Parsing error: ", e);
        res.status(500).send('Error parsing Python script output');
      }
    }
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

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    if (code !== 0) {
      res.status(500).send('Error executing Python script');
    } else {
      try {
        res.json(JSON.parse(scriptOutput));
      } catch (e) {
        console.error("Parsing error: ", e);
        res.status(500).send('Error parsing Python script output');
      }
    }
  });
});



app.post('/register', (req, res) => {
  console.log(req.body);
  const user = new userModel({
    'name': req.body.name,
    'email': req.body.email,
    'password': bcrypt.hashSync(req.body.password, 10),
  });

  user.save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err))

  res.json({});
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const schema = Joi.object(
    {
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }
  );

  const validate = schema.validate(req.body)

  if (validate.error == null) {
    console.log('valid');
    await userModel.findOne({ 'email': req.body.email })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.GLOBAL_AUTHENTICATED = true;
          req.session.USER_ID = user.id;
          res.sendStatus(202);
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err)
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(404);
  }
});

app.post('/logout', (req, res) => {
  if (req.body.endSession) {
    req.session.destroy();
  }

})

app.get('/', (req, res) => {
  res.send('Backend service is running');
});

const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

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
