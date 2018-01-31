import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  contactService: ContactService = null;
  contacts: Contact[] = [];

  constructor(private cs: ContactService) {
    this.contactService = cs;
    this.contacts = this.contactService.getContacts();
  }
  
  ngOnInit() { }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
