import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Document } from './document.model';

@Injectable()
export class DocumentService {
  jsonUrl: string = 'https://cit366-connorwiseman-cms.firebaseio.com/documents.json';
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();

  constructor(private http: Http) {
    this.initDocuments();
  }

  initDocuments() {
    this.http.get(this.jsonUrl)
      .map((response: Response) => {
        const documents: Document[] = response.json();
        return documents;
      })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.getDocuments());
      });
  }

  storeDocuments() {
    this.http.put(this.jsonUrl, JSON.stringify(this.documents))
      .subscribe(() => {
        this.documentListChangedEvent.next(this.getDocuments());
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.documents.forEach((document: Document) => {
      let currentId: number = Number(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.filter((document: Document) => {
      return document.id === id;
    })[0] || null;
  }

  addDocument(document: Document) {
    if (document) {
      document.id = String(++this.maxDocumentId);
      this.documents.push(document);
      this.storeDocuments();
    }
  }

  updateDocument(original: Document, updated: Document) {
    let pos;
    if (original && updated && (pos = this.documents.indexOf(original)) >= 0) {
      updated.id = original.id;
      this.documents[pos] = updated;
      this.storeDocuments();
    }
  }

  deleteDocument(document: Document) {
    let pos;
    if (document && (pos = this.documents.indexOf(document)) >= 0) {
      this.documents.splice(pos, 1);
      this.storeDocuments();
    }
  }

}
