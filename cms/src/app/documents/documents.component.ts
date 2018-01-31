import { Component, OnInit } from '@angular/core';

import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;
  documentService: DocumentService = null;

  constructor(documentService: DocumentService) {
    this.documentService = documentService;
  }

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }
}
