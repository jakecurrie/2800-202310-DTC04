const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const multer = require('multer');
const { spawn } = require('child_process');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const userModel = require('./model/users');
const { error } = require('console');
require('dotenv').config()



// routers
const fitnessRouter = require('./routes/fitness');
const indexRouter = require('./routes/index');
const passwordRouter = require('./routes/passwordReset');
const nutritionRouter = require('./routes/nutrition');
const imageRouter = require('./routes/images');
const userRouter = require('./routes/users');

const upload = multer({ dest: 'uploads/' });


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for cross-origin requests
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true, 
  methods: ['GET', 'POST'], 
}));

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function accessSecretVersion(secretName) {
  if (process.env.GAE_APPLICATION) {
    const name = `projects/artificialgains/secrets/${secretName}/versions/latest`;
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name,
    });
    return version.payload.data.toString();
  } else {
    return process.env[secretName];
  }
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
    app.use('/api/fitness', fitnessRouter);
    app.use('/api/reset-password', passwordRouter);
    app.use('/api/nutrition', nutritionRouter);
    app.use('/api/images', imageRouter);
    app.use('/api/users', userRouter);
    
    app.post('/classifyMeal', upload.single('image'), (req, res) => {
      const image = req.file;
      const python = spawn('python3', ['./scripts/meal_classification.py', image.path]);

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

app.post('/fetchNutrition', (req, res) => {
  const meals = req.body.meals;
  const mealSize = req.body.meal_size;
  const python = spawn('python3', ['./scripts/fetch_nutrition.py', meals, mealSize]);

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
    res.sendStatus(200)
    req.session.destroy();
  }

})

app.get('/profile', async (req, res) => {
  console.log(req.session.USER_ID);
  try {
    const userId = req.session.USER_ID;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponse = {
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});


app.get('/', (req, res) => {
  res.send('Backend service is running');
});

app.get('/viewfitnessplan', async (req, res) => {
  try {
    const userId = req.session.USER_ID;
    const currentUser = await userModel.findById(userId)
    if (!currentUser) {
      console.log("user not found");
    }
    const fitnessPlan = currentUser.fitnessPlan;
    fitnessPlan.array.forEach(element => {
      console.log(element.name);
    });
    res.json(fitnessPlan);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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
