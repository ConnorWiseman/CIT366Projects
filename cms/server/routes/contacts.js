const express           = require('express');
const Contact           = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();


function getContacts(req, res, next) {
  Contact.find().populate('group').exec((err, contacts) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      contact: 'Success',
      obj: contacts
    });
  });
}

function saveContact(res, contact) {
  if (contact && contact.group && contact.group.length) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }

  contact.save((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      contact: 'Contact saved',
      obj: result
    });
  });
}

function deleteContact(res, contact) {
  contact.remove((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Contact deleted',
      obj: result
    });
  });
}

router.get('/', getContacts);

router.post('/', (req, res, next) => {
  let maxContactId = sequenceGenerator.nextId('contacts');

  let contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  saveContact(res, contact);
});

router.patch('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id }, (err, contact) => {
    if (err || !contact) {
      return res.status(500).json({
        title: 'Contact not found',
        error: {
          contact: 'Contact not found'
        }
      });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact);
  });
});

router.delete('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id }, (err, contact) => {
    if (err || !contact) {
      return res.status(500).json({
        title: 'Contact not found',
        error: {
          contact: 'Contact not found'
        }
      });
    }

    deleteContact(res, contact);
  });
});

module.exports = router;