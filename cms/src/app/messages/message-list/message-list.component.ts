import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor() { }
  ngOnInit() { }

  onMessageSent(message: Message) {
    this.messages.push(message);
  }
}
