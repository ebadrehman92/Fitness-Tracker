const router = require("express").Router();
const Workout = require("../models/workout");
const mongoose = require("mongoose");

router.get("/api/workouts/", async (req, res) => {
  const workout = await Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((workoutDb) => {
      res.json(workoutDb);
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/api/workouts/:id", async (req, res) => {});

//GET RANGE
router.get("/api/workouts/range/", async (req, res) => {});

//POST WORKOUT
router.post("/api/workouts/", async ({ body }, res) => {
  console.log(body);
  await Workout.create(body)
    .then((workoutDb) => {
      res.json(workoutDb);
    })
    .catch((err) => res.status(400).json(err));
});

//UPDATE WORKOUT
router.put("/api/workouts/:id", async ({ body }, res) => {
  console.log(body);
  Workout.findByIdAndUpdate(body._id)
    .then((workoutDb) => {
      res.json(workoutDb);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
