import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document("id", "name", "description", "url", null)
  ];

  constructor() { }
  ngOnInit() { }
}
