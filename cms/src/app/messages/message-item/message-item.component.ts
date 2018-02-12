import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: [
    './message-item.component.css'
  ]
})
export class MessageItemComponent implements OnInit {
  @Input() public message: Message;
  sender: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.sender = this.contactService.getContact(this.message.sender.id);
  }
}
