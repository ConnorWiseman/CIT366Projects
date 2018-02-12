import { Component, OnInit } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(private  messageService: MessageService) { }
  ngOnInit() {}
}
