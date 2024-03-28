const Post = require('../models/post')

exports.dashboard_get = async (req,res) => {
    // console.log(req.user);
    const posts = await Post.find().populate('comments');
    const publishedPosts = posts.filter(post=> post.published == true);
    const unPublishedPosts = posts.filter(post=> post.published == false);


    res.render('dashboard', { title: "Dashboard", publishedPosts, unPublishedPosts, admin: true });
}