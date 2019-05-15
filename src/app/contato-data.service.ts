import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contact: null, key: '' });
  currentContato = this.contatoSource.asObservable();
  constructor() {
   }

  changeContato(contact: Contact, key: string) {
    this.contatoSource.next({ contact: contact, key: key });
  }

}
