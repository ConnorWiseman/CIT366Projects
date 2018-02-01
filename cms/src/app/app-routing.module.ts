import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
// Again, the original instructions didn't have us make a MessagesComponent.
// I'm just going to use the MessageListComponent, since that's what we ended
// up actually creating.
import { MessageListComponent } from './messages/message-list/message-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent }
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
