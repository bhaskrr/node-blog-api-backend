const { DateTime } = require('luxon');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

commentSchema.virtual('url').get(function(){
    return `/comments/${this._id}`;
})

commentSchema.virtual('createdAtFormatted').get(function(){
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
})

module.exports = mongoose.model("Comment", commentSchema);