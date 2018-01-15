var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec((err, messages) => {
            if (err) {
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

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Unauthenticate access',
                error: err
            })
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An Error Occured',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An Error Occured',
                    error: err
                });
            }
            user.messages.addToSet(result._id);
            user.save();

            res.status(201).json({
                message: 'Saved Message',
                obj: result
            });

        });

    })

});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        }

        if (!message) {
            return res.status(500).json({
                title: 'Message not found',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Unauthenticate access',
                error: {message: 'User not matched'}
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

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An Error Occured',
                error: e
            });
        }

        if (!message) {
            return res.status(500).json({
                title: 'Message not found',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Unauthenticate access',
                error: {message: 'User not matched'}
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

