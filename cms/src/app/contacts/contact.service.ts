import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  jsonUrl: string = 'https://cit366-connorwiseman-cms.firebaseio.com/contacts.json';
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
        const contacts: Contact[] = response.json();
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
    if (contact) {
      contact.id = String(++this.maxContactId);
      this.contacts.push(contact);
      this.storeContacts();
    }
  }

  updateContact(original: Contact, updated: Contact) {
    let pos;
    if (original && updated && (pos = this.contacts.indexOf(original)) >= 0) {
      updated.id = original.id;
      this.contacts[pos] = updated;
      this.storeContacts();
    }
  }

  deleteContact(contact: Contact) {
    let pos;
    if (contact && (pos = this.contacts.indexOf(contact)) >= 0) {
      this.contacts.splice(pos, 1);
      this.storeContacts();
    }
  }
}
