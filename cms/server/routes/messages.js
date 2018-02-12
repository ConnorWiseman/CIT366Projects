const express           = require('express');
const Message           = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();


function getMessages(req, res, next) {
  Message.find().exec((err, messages) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Success',
      obj: messages
    });
  });
}

function saveMessage(res, message) {
  message.save((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'Message saved',
      obj: result
    });
  });
}

function deleteMessage(res, message) {
  message.remove((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Message deleted',
      obj: result
    });
  });
}

router.get('/', getMessages);

router.post('/', (req, res, next) => {
  let maxMessageId = sequenceGenerator.nextId('messages');

  let message = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveMessage(res, message);
});

router.patch('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id }, (err, message) => {
    if (err || !message) {
      return res.status(500).json({
        title: 'Message not found',
        error: {
          message: 'Message not found'
        }
      });
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;

    saveMessage(res, message);
  });
});

router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id }, (err, message) => {
    if (err || !message) {
      return res.status(500).json({
        title: 'Message not found',
        error: {
          message: 'Message not found'
        }
      });
    }

    deleteMessage(res, message);
  });
});

module.exports = router;
