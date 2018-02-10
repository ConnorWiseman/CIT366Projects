import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filtered: Contact[] = contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(term.toLowerCase());
    });

    return (filtered.length < 1) ? contacts : filtered;
  }
}
