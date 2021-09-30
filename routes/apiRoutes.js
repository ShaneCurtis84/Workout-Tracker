const router = require("express").Router();
const { workout } = require('../models');

// Create a workout

router.post("/api/workouts", async ({ body }, res) => {
    try {
      const createWorkout = await workout.create(body);
      res.json(createWorkout);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  });




module.exports = router;