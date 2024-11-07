const { Schema, model} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
    toJSON: {
        getters: true
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  },
{
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



// virtual that retrieves the length of the thought's reactions array field on query

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
