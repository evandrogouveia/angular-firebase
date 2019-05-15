import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  addContact(contact: Contact) {
    this.db.list('contact').push(contact)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  editContact(contact: Contact, key: string) {

    this.db.list('contact').update(key, contact).then((result: any) => {
      }).catch((error: any) => {
        console.error(error);
      });
  }

  deleteContact(key: string) {
    this.db.object(`contact/${key}`).remove();
  }
}