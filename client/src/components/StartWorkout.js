import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/StartWorkout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'


const StartWorkout = ({ updatePoints }) => {
    const [workouts, setWorkouts] = useState([]);
    const [totalSets, setTotalSets] = useState(0);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const date = new Date();
    const currentDayIndex = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [weight, setWeight] = useState('');
    const [personalBest, setPersonalBest] = useState('');
    const [setsRemaining, setSetsRemaining] = useState(0);
    const [workoutDayComplete, setWorkoutDayComplete] = useState(false);
    const initialRender = useRef(true);
    axios.defaults.withCredentials = true;
    
    axios.post('/api/fitness/complete-day', {
        day: daysOfWeek[currentDayIndex],
        week: 1,
    }).then(response => {
        const { workoutDayCompleted } = response.data;
        setWorkoutDayComplete(workoutDayCompleted);
    }).catch(error => {
        console.error('Error during API call', error);
    });
    useEffect(() => {
        axios.get('/api/fitness/start-workout').then(response => {
            const workoutsArray = response.data.exercises.filter(item => {
                return item.day === daysOfWeek[currentDayIndex];
            });
            const sortedWorkouts = workoutsArray.sort((a, b) => a.order - b.order);
            setWorkouts(sortedWorkouts);
        }).catch(error => {
            console.error('Error during API call', error);
        });
    }, []);

    useEffect(() => {
        if (workouts.length > 0 && setsRemaining === 0) {
            let activeWorkoutIndex = currentWorkoutIndex;
            let activeWorkout = workouts[activeWorkoutIndex];

            while (activeWorkout && activeWorkout.weeksCompleted?.find(week => week.week === 1)?.setsRemaining === 0) {
                activeWorkoutIndex += 1;
                activeWorkout = workouts[activeWorkoutIndex];
            }

            setCurrentWorkoutIndex(activeWorkoutIndex);

            if (activeWorkout) {
                const initialPersonalBest = activeWorkout.personalBest || 0;
                setPersonalBest(initialPersonalBest);
                const initialSetsRemaining = activeWorkout.weeksCompleted?.find(week => week.week === 1)?.setsRemaining || 0;
                setSetsRemaining(initialSetsRemaining);
                const initialTotalSets = activeWorkout.sets || 0; // Add this line
                setTotalSets(initialTotalSets);
            }
        }
    }, [workouts, setsRemaining, currentWorkoutIndex]);


    const handleNextSet = async () => {
        console.log(currentWorkoutIndex)
        updatePoints();
        let newSetsRemaining = setsRemaining - 1;
        if (newSetsRemaining < 0) {
            newSetsRemaining = 0;
        }
        setSetsRemaining(newSetsRemaining);

        const enteredWeight = parseInt(weight);
        let updatedPersonalBest = personalBest;

        if (enteredWeight > personalBest) {
            console.log(enteredWeight);
            setPersonalBest(enteredWeight);
            updatedPersonalBest = enteredWeight;
        }

        await axios
            .post('/api/fitness/record-workout', {
                exerciseName: workouts[currentWorkoutIndex].exerciseName,
                // exerciseName: "Leg Press",
                personalBest: updatedPersonalBest,
                setsRemaining: newSetsRemaining,
                setWeight: enteredWeight,
                totalSets: totalSets,

            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during API call', error);
            });

        if (newSetsRemaining === 0 && currentWorkoutIndex < workouts.length - 1) {
            axios.post('/api/fitness/complete-exercise', {
                exerciseName: workouts[currentWorkoutIndex].exerciseName,
            })
            setCurrentWorkoutIndex(prevIndex => prevIndex + 1);
            const nextWorkout = workouts[currentWorkoutIndex + 1];
            const initialPersonalBest = nextWorkout.personalBest || 0;
            const initialSetsRemaining = nextWorkout.weeksCompleted?.find(week => week.week === 1)?.setsRemaining || 0;
            setPersonalBest(initialPersonalBest);
            setSetsRemaining(initialSetsRemaining);
            const initialTotalSets = nextWorkout.totalSets || 0; // Add this line
            setTotalSets(initialTotalSets)
        } else if (newSetsRemaining === 0 && currentWorkoutIndex === workouts.length - 1) {
            axios.post('/api/fitness/complete-exercise', {
                exerciseName: workouts[currentWorkoutIndex].exerciseName,
            })
                .then(response => {
                    // Handle response of the first request
                    console.log(response);

                    return axios.post('/api/fitness/complete-day', {
                        // Provide the necessary data
                        day: daysOfWeek[currentDayIndex],
                        week: 1,
                    });
                })
                .then(response => {
                    // Handle response of the second request
                    console.log(response);
                    alert('Workout for the day is completed');

                    // Display a message or update the UI to indicate that the workout day is complete
                    return axios.post('/api/fitness/complete-day/setScore')
                    
                })
                .catch(error => {
                    // Handle error of the requests
                    console.error(error);
                });
        } else {
            setSetsRemaining(newSetsRemaining);
        }
    };

    const fetchYouTubeVideo = async (exerciseName) => {
        try {
          console.log(exerciseName)
          // Make a request to search for videos related to the exercise
          const response = await axios.get('/api/fitness/exercise-video', {
            params: {
              exerciseName: exerciseName,
              part: 'snippet',
              maxResults: 1,
              q: `exercise and fitness how to properly do ${exerciseName}`,
            }
          });
          // Extract the video ID
          console.log(response);
          const videoId = response.data.videoId;
    
          // Open the video in a new tab
          window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        } catch (error) {
          console.error('Error fetching YouTube video:', error);
        }
    
      };

    const handleWeightChange = (event) => {
        const enteredWeight = event.target.value;

        setWeight(enteredWeight);
    }

    const currentWorkout = workouts[currentWorkoutIndex];
    if (workoutDayComplete) {
        return (
            <div id='startFit-body-container'>

                <div id='startFit-complete-container'>
                    <h1 id='startFit-complete'>Workout for the day is completed!</h1>
                </div>
                <div id='startFit-complete-container'>
                    <h5 id='startFit-complete'>You've Gained EXTRA 1000 points for finishing todays workout!</h5>
                </div>
            </div>
        );
    } else
        return (
            <div id='startFit-body-container'>
                <div id="startFit-title-container">
                    <h1 id="startFit-title-title">Fitness</h1>
                    <p id='startFit-title-subtext'>Start Workout</p>
                </div>
                <div id='startFit-card-container'>
                    {currentWorkout ? (
                        <div className='startFit-cards'>
                            <div className='startFit-card-workout-title'>
                                <h2 className='startFit-card-h2'>{currentWorkout.exerciseName}</h2>
                                <FontAwesomeIcon className='startFit-card-play' icon={faCirclePlay} onClick={() => fetchYouTubeVideo(currentWorkout.exerciseName)} />
                            </div>
                            <div className='startFit-card-rep-set-container'>
                                <div className='startFit-card-rp-pb-seperator'>
                                    <div className='startFit-card-reps-container'>
                                        <p className='startFit-card-reps'>Reps</p>
                                        <p className='startFit-card-reps-count'>{currentWorkout.reps}</p>
                                    </div>
                                    <div className='startFit-card-sets-container'>
                                        <p className='startFit-card-sets'>Sets</p>
                                        <p className='startFit-card-sets-count'>{setsRemaining}</p>
                                    </div>
                                </div>
                                <div className='startFit-card-pb-container'>
                                    <p className='startFit-card-pb'>Personal Best: {personalBest}</p>
                                    <input className='startFit-enter-weight' type="text" placeholder="Enter Weight" value={weight} onChange={handleWeightChange} />
                                </div>
                            </div>
                            <button className='startFit-complete-button' onClick={handleNextSet}>Completed Set</button>
                        </div>
                    ) : (
                        <div id='startFit-loading-container'>
                            <p id='startFit-loading'>Loading workout...</p>
                            {/* <button onClick={handleNextSet}>Completed Set</button> */}
                        </div>
                    )}
                </div>
            </div>
        );
};

export default StartWorkout;






