const express = require('express')
const Video = require('../models/videos.js');
const authMiddleware = require('../utils/authMiddleware.js');
const User = require('../models/users.js');
const Comment = require('../models/comments.js')
const videoRouter = express.Router();

videoRouter.get('/videos', videoFetchHandler)

videoRouter.post('/video', authMiddleware, videoUploadHandler);
videoRouter.post('/video/:id/like', authMiddleware, likeUnlikeAvideo);
videoRouter.post('/video/:id/comment', authMiddleware, commentOnAvideo);

videoRouter.get('/user', authMiddleware, getUserInfo);
videoRouter.post('/user/:id/subscribe', authMiddleware, subscribeOrUnsubscribeAchannel);

async function videoFetchHandler(req, res){
    try{
        let videos = [];
        const videosFromDB = await Video.find();
        if(videosFromDB.length > 20){
            videos = videosFromDB.subarr(0, 20);
        }else{
            videos = videosFromDB;
        }
        
        console.log(`Fetched ${videos.length} videos`);
        return res.send({
            videos: videos,
            success: true
        })
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

async function videoUploadHandler(req, res){
    try{
        const id = req.user._id;
        // add video to the channel;
        const video = new Video(req.body);
        video.user = id;
        await video.save();

        const user = await User.findById(id);
        user.videos.push(video._id);
        await user.save();

        console.log(`Video ${video._id} upload success for user ${req.user.email}`);
        res.send({
            video: video,
            success: true
        })
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

async function likeUnlikeAvideo(req, res){
    try{
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        const userOrChannel = await User.findById(req.user._id);

        // Intelligent like or unlike feature
        if(userOrChannel.likedVideos.includes(videoId)){
            video.likes = video.likes - 1;
            userOrChannel.likedVideos.pull(videoId);
        } else {
            video.likes = video.likes + 1;
            userOrChannel.likedVideos.push(videoId);
        }
        await userOrChannel.save();
        await video.save();

        res.send({
            video: video,
            success: true
        })
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

async function commentOnAvideo(req, res){
    try{
        const userOrChannelName = req.user.name || 'Anonymous User';
        const videoId = req.params.id;
        const video = await Video.findById(videoId);
        req.body.commentedBy = userOrChannelName;
        const comment = new Comment(req.body);
        video.comments.push(comment._id);

        await comment.save();
        await video.save();

        res.send({
            comment: comment,
            success: true
        })
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

// User endpoints

async function getUserInfo(req, res){
    try{
        const user = await User.findById(req.user._id);
        await user.populate('videos');

        console.log(`Fetched Details for user ${req.user.email}`);

        res.send({
            user: user,
            sucess: true
        })
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

async function subscribeOrUnsubscribeAchannel(req, res){
    try{
        const subscribeToChannel = req.params.id;
        const userId = req.user._id;
    
        const currentUser = await User.findById(userId);
        const targetChannel = await User.findById(subscribeToChannel);
    
        // Intelligent subscribe or unsubscribe feature
        if(currentUser.subscribedTo.includes(subscribeToChannel)){
            console.log('Already subscribed. Unsubscribing..')
            currentUser.subscribedTo.pull(subscribeToChannel);
            targetChannel.subscribers--;
        } else {
            currentUser.subscribedTo.push(subscribeToChannel);
            targetChannel.subscribers++;
        }
    
        await currentUser.save();
        await targetChannel.save();
    
        res.send({
            user: currentUser,
            success: true
        })   
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

// videoRouter.get('/videos', function(req, res){
//     return res.send([{id: "1", link : "some video link"}])
// })

// videoRouter.post('/video', function(req, res){
//     console.log(req.body);
//     return res.send({body: req.body, response: "success"});
// })

module.exports = videoRouter;