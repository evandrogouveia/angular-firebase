import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactService } from '../service/contact.service';
import { ContactComponent } from '../contact/contact.component';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../contato-data.service';
import { Contact } from '../model/contact';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Observable<any>;
  isPopupOpened = true;

  constructor(private dialog: MatDialog,
    private contactService: ContactService,
    private contatoDataService: ContatoDataService,
    private db: AngularFireDatabase) {
      this.contacts = this.db.list('contact')
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          })
        );
    }

  ngOnInit() {
  }

  addContact() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ContactComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editContact( contact: Contact, key: string) {
    this.isPopupOpened = true;

    this.contatoDataService.changeContato(contact, key);
    const dialogRef = this.dialog.open(ContactComponent, {
      data: contact
    });


    dialogRef.afterClosed().subscribe(result => {
      this.contatoDataService.changeContato(null, null);
    });

  }

  deleteContact(key: string) {
    this.contactService.deleteContact(key);
  }

  getAllContacts() {
    return this.db.list('contact')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
}
