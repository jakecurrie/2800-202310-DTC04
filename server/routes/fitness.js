// router.js
const express = require('express');
const router = express.Router();
const { getCompletion } = require('./openai/OpenAI');
const userModel = require('../model/users');
const fetch = require('node-fetch');

router.post('/record-workout', async (req, res) => {
  const date = new Date();
  const currentDay = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  try {
    console.log(req.session.USER_ID);
    const { exerciseName, personalBest, setsRemaining, setWeight, totalSets } = req.body;
    console.log(setsRemaining);
    console.log(exerciseName);
    console.log(totalSets)
    const setNumber = totalSets - setsRemaining;
    console.log(setNumber)

    const user = await userModel.findOneAndUpdate(
      {
        _id: req.session.USER_ID,
        "fitnessPlan.exercises": {
          $elemMatch: {
            day: daysOfWeek[currentDay],
            exerciseName: exerciseName
          }
        }
      },
      {
        $set: {
          "fitnessPlan.exercises.$[exercise].personalBest": personalBest,
          "fitnessPlan.exercises.$[exercise].weeksCompleted.$[week].setsRemaining": setsRemaining,
          "fitnessPlan.exercises.$[exercise].weeksCompleted.$[week].setsData.$[set].weight": setWeight,


        },
        $inc: {
          points: 100
        }
      },
      {
        new: true,
        arrayFilters: [
          { "exercise.day": daysOfWeek[currentDay], "exercise.exerciseName": exerciseName },
          { "week.week": 1 }, // Provide the condition for filtering the specific week
          { "set.setName": `Set${setNumber}` }
        ]
      }
    );
    console.log('increased by 100', user.points);

    if (!user) return res.status(400).send("User does not exist");
    console.log(personalBest);
    res.json(user.fitnessPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/complete-exercise', async (req, res) => {
  const day = new Date().getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  try {
    console.log(req.session.USER_ID);
    //i want to toggle the isCompleted boolean inside the fitnessPlan weeksCompleted array for the current day and week
    const { exerciseName } = req.body;
    console.log(exerciseName);
    const user = await userModel.findOneAndUpdate(
      {
        _id: req.session.USER_ID,
        "fitnessPlan.exercises": {
          $elemMatch: {
            day: daysOfWeek[day],
            exerciseName: exerciseName
          }
        }
      },
      {
        $set: {
          "fitnessPlan.exercises.$[exercise].weeksCompleted.$[week].isCompleted": true
        }
      },
      {
        new: true,
        arrayFilters: [
          { "exercise.day": daysOfWeek[day], "exercise.exerciseName": exerciseName },
          { "week.week": 1 }
        ]
      }
    );


    if (!user) return res.status(400).send("user does not exist");
    // Handle the generated workout plan (e.g., send it as a response)
    console.log(user.fitnessPlan);
    res.json(user.fitnessPlan);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/complete-day/setScore', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.session.USER_ID,
      {
        $inc: {
          points: 1000
        }
      },
      {
        new: true
      }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/complete-day', async (req, res) => {
  try {
    // Fetch user's fitness plan by user id
    const user = await userModel.findById(req.session.USER_ID);

    // Check if user exists
    if (!user) {
      console.log("no user")
      return res.status(404).json({ message: "User not found" });
    }

    const fitnessPlan = user.fitnessPlan;

    // Fetch the day and week from the request body
    const { day, week } = req.body;

    // Check if all workouts for the day and week are completed
    const completed = fitnessPlan.exercises.every(exercise => {
      if (exercise.day === day) {
        const weekData = exercise.weeksCompleted.find(w => w.week === week);
        return weekData && weekData.isCompleted;
      }
      return true;
    });

    if (completed) {
      // If all workouts are completed, send a success response
      res.json({ workoutDayCompleted: true });
    } else {
      // If any workout is not completed, send a failure response
      res.json({ message: "Not all workouts for the day are completed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/start-workout', async (req, res) => {
  const date = new Date();
  const currentDay = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  try {
    console.log(req.session.USER_ID);
    // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request


    const user = await userModel.findById(req.session.USER_ID).select('fitnessPlan').exec();

    // const user = await userModel.findById(req.session.USER_ID);

    if (!user) return res.status(400).send("user does not exist");

    // Handle the generated workout plan (e.g., send it as a response)
    console.log(user.fitnessPlan);
    res.json(user.fitnessPlan);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/view-plan', async (req, res) => {

  try {
    console.log(req.session.USER_ID);
    // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request
    const { data } = req.body;
    console.log(data);
    const user = await userModel.findById(req.session.USER_ID).select('fitnessPlan').exec();

    // const user = await userModel.findById(req.session.USER_ID);

    if (!user) return res.status(400).send("user does not exist");

    // Handle the generated workout plan (e.g., send it as a response)
    console.log(user.fitnessPlan.exercises);
    res.json(user.fitnessPlan.exercises);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/generate-plan', async (req, res) => {
  try {
    const workoutPlan = await getCompletion(req, req.body);
    // Handle the generated workout plan (e.g., send it as a response)
    res.send({ workoutPlan });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/save-plan', async (req, res) => {

  try {
    console.log(req.session.USER_ID);
    // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request
    const { dataTwo } = req.body;
    console.log(dataTwo);
    const user = await userModel.findByIdAndUpdate(
      req.session.USER_ID,
      { fitnessPlan: dataTwo },
      { new: true }
    );

    // const user = await userModel.findById(req.session.USER_ID);

    if (!user) return res.status(400).send("user does not exist");
    if (user) return res.status(200).send("plan saved")

    // Handle the generated workout plan (e.g., send it as a response)
    console.log(user);
    console.log("completed");
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/exercise-video', async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const { exerciseName, q } = req.query;
    console.log(exerciseName)

    // Make a request to the YouTube API to fetch videos related to the exercise
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${q}&type=video&maxResults=1`);

    // Convert the response to JSON
    const data = await response.json();

    // Extract the video ID
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      console.log(videoId)
      // Return the video ID as the response
      res.json({ videoId });
    } else {
      // Handle the case where no videos were found
      res.status(404).json({ error: 'No videos found' });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/personalBest/:exerciseName', async (req, res) => {
  try {
    const userId = req.session.USER_ID;
    const { exerciseName } = req.params;
    const user = await userModel.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const exercise = user.fitnessPlan.exercises.find(ex => ex.exerciseName === exerciseName);

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    const data = exercise.weeksCompleted.map((week, index) => {
      const weekData = {
        week: index + 1,
        personalBest: null,
        currentWeight: null
      };

      const personalBestValues = week.setsData
        .filter(setData => setData.weight !== null)
        .map(setData => setData.weight);

      if (personalBestValues.length > 0) {
        weekData.personalBest = Math.max(...personalBestValues);
      }

      if (week.setsData.length > 0) {
        weekData.currentWeight = week.setsData[week.setsData.length - 1].weight;
      }

      return weekData;
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






module.exports = router;
