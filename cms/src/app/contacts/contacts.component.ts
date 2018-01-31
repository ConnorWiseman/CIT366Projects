import { Component, OnInit } from '@angular/core';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact = null;
  contactService: ContactService = null;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
