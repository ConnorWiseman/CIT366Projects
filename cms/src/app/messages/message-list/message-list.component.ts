import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit {
  messageService: MessageService = null;
  messages: Message[] = [];

  constructor(private ms: MessageService) {
    this.messageService = ms;
    this.messages = this.messageService.getMessages();
  }

  ngOnInit() {
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onMessageSent(message: Message) {
    this.messages.push(message);
  }
}
