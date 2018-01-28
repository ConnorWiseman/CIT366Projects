import { Component, OnInit, Input } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html'
})
export class DocumentItemComponent implements OnInit {
  @Input() public document: Document;

  constructor() { }
  ngOnInit() { }
}
