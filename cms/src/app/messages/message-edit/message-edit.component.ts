import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html'
})
export class MessageEditComponent implements OnInit {
  @Input() subject: string;
  @Input() msgText: string;
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;

  currentId: number = 1;
  currentSender: string = 'Connor';

  constructor() { }
  ngOnInit() { }

  onSendMessage() {
    this.subject = this.subjectInputRef.nativeElement.value;
    this.msgText = this.messageInputRef.nativeElement.value;
    this.addMessageEvent.emit(new Message(String(this.currentId++), this.subject,
      this.msgText, this.currentSender));
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
