const  { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    published: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

postSchema.virtual('url').get(function(){
    return `/posts/${this._id}`;
})

postSchema.virtual('createdAtFormatted').get(function(){
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Post', postSchema);