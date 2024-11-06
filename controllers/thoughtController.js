const {User, Thought} = require('../models');


module.exports = {
    // get all thoughts 
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get one thought by id    
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
            .select('-__v');
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create({thoughtText: req.body.thoughtText, username: req.body.username});
            //adding thought to user's thoughts array
            const user = await User.findByIdAndUpdate(
                req.body._id,
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            res.status(201).json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    // update a thought by id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        }
        catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    // delete thought by Id
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },  
    // create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },  
    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};
