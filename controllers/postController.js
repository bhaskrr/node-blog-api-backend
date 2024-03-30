const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.post_get = async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findById(id).populate('comments');

    if (!post) { return res.json("post couldnot be found") };
    // res.render('postinstance', { title: post.title, post, admin: true });
    res.json(post);
}

exports.post_publish = async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, { published: true });

    if (!post) { return res.json("post couldnot be found") };
    res.redirect('/dashboard');
}

exports.post_unpublish = async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, { published: false });

    if (!post) { return res.json("post couldnot be found") };
    res.redirect('/dashboard');
}

exports.comment_new_get = (req, res, next) => {
    const postId = req.params.id;
    res.render('commentform', { title: "Add a comment", postId });
}

exports.comment_new_post = [
    body('author')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Author name must be at least 1 character long!')
        .escape()
        .withMessage('Author name must be specified!'),

    body('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Comment must be at least 1 character long!')
        .escape()
        .withMessage('Comment must be specified!'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return render('commentform', { title: "Add a comment", errors: errors.array() })
        try {
            const postId = req.params.id;
            const post = await Post.findById(postId);

            if (!post) return res.json('Post couldnot be found');
            

            const newComment = new Comment({
                author: req.body.author,
                content: req.body.content
            })

            await newComment.save();
            post.comments.push(newComment._id);
            await post.save();

            res.redirect('/posts');
        } catch (err) {
            console.log(err);
        }
    }
]


