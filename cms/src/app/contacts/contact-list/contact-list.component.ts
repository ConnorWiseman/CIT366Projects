import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.contactsChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
