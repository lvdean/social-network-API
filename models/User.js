const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
    .virtual('friendCount')
    //getter
    .get(function () {
        return this.friends.length;
    })
  



// Initialize our User model
const User = model('User', userSchema);

module.exports = User;