const express = require('express');
const { PostModel } = require('../model/postModel');

const postRouter = express.Router();

//Getting all post:
postRouter.get('/', async (req, res) => {
    const dev = req.query.device;

    if (dev) {
        try {
            const posts = await PostModel.find({ device: dev });
            res.send(posts);
        } catch (error) {
            console.log("Error in get post route", error);
            res.send("Error in get Post route");
        }
    } else {
        try {
            const posts = await PostModel.find();
            res.send(posts);
        } catch (error) {
            console.log("Error in get post route", error);
            res.send("Error in get Post route");
        }
    }
});

//Post:
postRouter.post('/addpost', async (req, res) => {
    const payload = req.body;
    try {
        const newpost = new PostModel(payload);
        await newpost.save();
        res.send("New post added");
    } catch (error) {
        console.log('Error in posting route', error);
        res.send('Error in posting post');
    }
})

// //top comments:
// postRouter.get('/top', async(req,res)=>{
//     try {
//         const top= await PostModel.find({no_of_comments:})
//     } catch (error) {
//         console.log('Error in top post route', error);
//         res.send('Error in top post route');
//     }
// })

//patch:
postRouter.patch('/update/:id', async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;

    try {
        await PostModel.findByIdAndUpdate({ _id: ID }, payload);
        res.send('Post Updated');
    } catch (error) {
        console.log("Error in patch post route", error);
        res.send('Error in patch post route');
    }
});

//Deleting post:
postRouter.delete('/delete/:id', async (req, res) => {
    const ID = req.params.id;

    try {
        await PostModel.findByIdAndDelete({ _id: ID });
        res.send('Post Deleted');
    } catch (error) {
        console.log("Error in delete post route", error);
        res.send("error in delete post route");
    }
});


module.exports = { postRouter };