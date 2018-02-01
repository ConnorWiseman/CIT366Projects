import { Injectable, Output, EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactsChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }

  deleteContact(contact: Contact) {
    let pos;
    if (contact && (pos = this.contacts.indexOf(contact)) >= 0) {
      this.contacts.splice(pos, 1);
      this.contactsChangedEvent.emit(this.getContacts());
    }
  }
}
