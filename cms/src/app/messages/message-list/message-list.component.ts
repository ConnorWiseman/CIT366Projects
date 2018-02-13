import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  messages: Message[] = [];

  constructor(private messageService: MessageService,
    private contactService: ContactService) { }

  ngOnInit() {
    // This just makes sure the contacts used as message senders are loaded!
    this.contactService.getContacts();
    // There must be a better way!
    
    this.messages = this.messageService.getMessages();

    this.subscription = this.messageService.messageListChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onMessageSent(message: Message) {
    this.messages.push(message);
  }
}
