var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res, next){
    Message.find()
        .exec((err,messages) => {
            if(err){
                return res.status(500).json({
                    title: 'An Error Occured',
                    error: e
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});

router.post('/', function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });

    message.save().then((result) => {
        res.status(201).json({
            message: 'Saved Message',
            obj: result
        });
    }).catch((e) => {
        res.status(500).json({
            title: 'An Error Occured',
            error: e
        });
    });
});

router.patch('/:id', function(req, res, next){
    Message.findById(req.params.id, function (err, message){
        if(err){
            return res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        }

        if(!message){
            return res.status(500).json({
                title: 'Message not found',
                error: {message: 'Message not found'}
            });
        }

        message.content = req.body.content;
        message.save().then((result) => {
            res.status(200).json({
                message: 'Updated Message',
                obj: result
            });
        }).catch((e) => {
            res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        });
    })
})

router.delete('/:id', function(req, res, next){
    Message.findById(req.params.id, function (err, message){
        if(err){
            return res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        }

        if(!message){
            return res.status(500).json({
                title: 'Message not found',
                error: {message: 'Message not found'}
            });
        }

        message.remove().then((result) => {
            res.status(200).json({
                message: 'Deleted Message',
                obj: result
            });
        }).catch((e) => {
            res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        });
    })
})


module.exports = router;

