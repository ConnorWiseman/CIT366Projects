import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Contact } from './contact.model';

@Injectable()
export class ContactService {
  jsonUrl: string = 'http://localhost:3000/contacts';
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor(private http: Http) {
    this.initContacts();
  }

  initContacts() {
    this.http.get(this.jsonUrl)
      .map((response: Response) => {
        const contacts: Contact[] = response.json().obj;
        return contacts;
      })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

  storeContacts() {
    this.http.put(this.jsonUrl, JSON.stringify(this.contacts))
      .subscribe(() => {
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.contacts.forEach((contact: Contact) => {
      let currentId: number = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    this.http.post(this.jsonUrl, strContact, { headers: headers })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((contact: Contact) => {
        this.contacts.push(contact);
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

  updateContact(original: Contact, updated: Contact) {
    if (!original || !updated) {
      return;
    }

    const pos = this.contacts.indexOf(original);
    if (pos < 0) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(updated);
    console.log(updated);

    this.http.patch(`${this.jsonUrl}/${original.id}`, strContact, { headers: headers })
      .map((response: Response) => {
        return response.json().obj;
      })
      .subscribe((contact: Contact) => {
        console.log('angular result', contact);
        this.contacts[pos] = contact;
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.jsonUrl}/${contact.id}`)
      .map((response: Response) => {
        return response.json();
      })
      .subscribe((json) => {
        if (json.message === 'Contact deleted') {
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.getContacts());
        }
      });
  }
}
