import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact("1", "Bro. Jackson", "jacksonk@byui.edu", "208-496-3771",
      "../assets/images/jacksonk.jpg", null),
    new Contact("2", "Bro. Barzee", "barzeer@byui.edu", "208-496-3768",
      "../assets/images/barzeer.jpg", null)
  ];

  constructor() { }
  ngOnInit() { }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
