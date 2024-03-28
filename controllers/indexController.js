const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.index_get = (req, res) => {
    res.json('Index page');
}

exports.posts_get = async (req,res,next) => {
    const posts = await Post.find({"published" : true});
    if(!posts) return res.json('Unable to get posts from the database!');
    if(posts.length == 0) return res.json('No posts published yet!');
    res.json(posts);
    // res.render('dashboard', { title: "All posts", posts })

}

exports.create_post_get = (req,res,next) => {
    res.render('createpostform', { title: "Create Blog" })
}

exports.create_post_post = [
    body("title")
        .trim()
        .isLength({min: 1})
        .withMessage('Title must be at least 1 character long!')
        .escape()
        .withMessage('Title must be specified!'),

    body("content")
        .trim()
        .isLength({min : 1})
        .withMessage("Content must be at least 1 character long")
        .escape()
        .withMessage('Content must be specified!'),

    async(req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return req.render('createpostform', { message: errors })
        }

        const post = new Post({
            title: req.body.title,
            content: req.body.content
        })

        await post.save();
        res.redirect('/dashboard');
    }
]