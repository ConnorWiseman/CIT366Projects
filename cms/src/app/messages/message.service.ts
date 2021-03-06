import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Message } from './message.model';

@Injectable()
export class MessageService {
  jsonUrl: string = 'https://cit366-connorwiseman-cms.firebaseio.com/messages.json';
  @Output() messageListChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: Http) {
    this.initMessages();
  }

  initMessages() {
    this.http.get(this.jsonUrl)
      .map((response: Response) => {
        const messages: Message[] = response.json();
        return messages;
      })
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.getMessages());
      });
  }

  storeMessages() {
    this.http.put(this.jsonUrl, JSON.stringify(this.messages))
      .subscribe(() => {
        this.messageListChangedEvent.next(this.getMessages());
      });
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.messages.forEach((message: Message) => {
      let currentId: number = Number(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.filter((message: Message) => {
      return message.id === id;
    })[0] || null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

}
