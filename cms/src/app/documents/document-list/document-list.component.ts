import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("id", "name1", "description1", "url1", null),
    new Document("id", "name2", "description2", "url2", null),
    new Document("id", "name3", "description3", "url3", null),
    new Document("id", "name4", "description4", "url4", null),
    new Document("id", "name5", "description5", "url5", null)
  ];

  constructor() { }
  ngOnInit() { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
