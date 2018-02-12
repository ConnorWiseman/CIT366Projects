const express           = require('express');
const Document          = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');

const router = express.Router();


function getDocuments(req, res, next) {
  Document.find().exec((err, documents) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Success',
      obj: documents
    });
  });
}

function saveDocument(res, document) {
  document.save((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'Document saved',
      obj: result
    });
  });
}

function deleteDocument(res, document) {
  document.remove((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Document deleted',
      obj: result
    });
  });
}

router.get('/', getDocuments);

router.post('/', (req, res, next) => {
  let maxDocumentId = sequenceGenerator.nextId('documents');

  let document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveDocument(res, document);
});

router.patch('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id }, (err, document) => {
    if (err || !document) {
      return res.status(500).json({
        title: 'Document not found',
        error: {
          document: 'Document not found'
        }
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  });
});

router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id }, (err, document) => {
    if (err || !document) {
      return res.status(500).json({
        title: 'Document not found',
        error: {
          document: 'Document not found'
        }
      });
    }

    deleteDocument(res, document);
  });
});

module.exports = router;
