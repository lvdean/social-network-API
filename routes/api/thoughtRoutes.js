// /api/thoughts
// GET to get all thoughts
// GET to get a single thought by its _id
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value

const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/:id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);

module.exports = router;
