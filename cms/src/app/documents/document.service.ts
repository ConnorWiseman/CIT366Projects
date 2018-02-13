import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Document } from './document.model';

@Injectable()
export class DocumentService {
  jsonUrl: string = 'http://localhost:3000/api/documents';
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
        const documents: Document[] = response.json().obj;
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
    if (!document) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post(this.jsonUrl, strDocument, { headers: headers })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((document: Document) => {
        this.documents.push(document);
        this.documentListChangedEvent.next(this.getDocuments());
      });
  }

  updateDocument(original: Document, updated: Document) {
    if (!original || !updated) {
      return;
    }

    const pos = this.documents.indexOf(original);
    if (pos < 0) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(updated);

    this.http.patch(`${this.jsonUrl}/${original.id}`, strDocument, { headers: headers })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((document: Document) => {
        this.documents[pos] = document;
        this.documentListChangedEvent.next(this.getDocuments());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.jsonUrl}/${document.id}`)
      .map((response: Response) => {
        return response.json();
      })
      .subscribe((json) => {
        if (json.message === 'Document deleted') {
          this.documents.splice(pos, 1);
          this.documentListChangedEvent.next(this.getDocuments());
        }
      });
  }

}
