import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  documents: Document[] = [];
  documentService: DocumentService = null;

  constructor(ds: DocumentService) {
    this.documentService = ds;
    this.documents = this.documentService.getDocuments();
  }
  ngOnInit() { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
