import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html'
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;

  constructor() { }
  ngOnInit() { }
}
