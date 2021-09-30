const router = require("express").Router();
const db = require("../models");

// Create workout plan

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const createWorkout = await db.workout.create(body);
    res.json(createWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Get Workout and use aggregate function to get total distance
router.get("/api/workouts", async (req, res) => {
  try {
    const Workout = await db.workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ]);
    res.json(Workout);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Get last 7 work outs and get total distance and total weight
router.get("/api/workouts/range", async (req, res) => {
  try {
    const sevenLastWorkout = await db.workout
      .aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
            totalWeight: {
              $sum: "$exercises.weight",
            },
          },
        },
      ])
      .limit(7);
    res.json(sevenLastWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Update workout plan
router.put("/api/workouts/:id", async (req, res) => {
  try {
    const updateWorkout = await db.workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: req.body },
    });
    res.json(updateWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
