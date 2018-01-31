import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {
  documentService: DocumentService = null;
  documents: Document[] = [];

  constructor(private ds: DocumentService) {
    this.documentService = ds;
    this.documents = this.documentService.getDocuments();
  }
  
  ngOnInit() { }

  onDocumentSelected(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
