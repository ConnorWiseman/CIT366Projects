const express           = require('express');
const Contact           = require('../models/contact');
const Message           = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();


function getMessages(req, res, next) {
  Message.find().populate('sender').exec((err, messages) => {
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
  if (message && message.contact) {
    message.contact = message.contact.id;
  }

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
  Contact.findOne({ id: req.body.sender.id }, (err, sender) => {
    if (err || !sender) {
      return res.status(500).json({
        title: 'Message sender not found',
        error: {
          message: 'Message sender not found'
        }
      });
    }

    let maxMessageId = sequenceGenerator.nextId('messages');

    let message = new Message({
      id: maxMessageId,
      msgText: req.body.msgText,
      subject: req.body.subject,
      sender: sender._id
    });

    saveMessage(res, message);
  })
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
