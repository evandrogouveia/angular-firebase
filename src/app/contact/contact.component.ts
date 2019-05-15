import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from '../service/contact.service';
import { Contact } from '../model/contact';
import { ContatoDataService } from '../contato-data.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact;
  key: string = '';
  angForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<ContactComponent>,
  private contactService: ContactService, private contatoDataService: ContatoDataService,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
       nome: ['', Validators.required ],
       data: ['', Validators.required ],
       descricao: ['', Validators.required ]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.contact = new Contact();
    this.key = '';
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contact && data.key) {
        this.contact.Nome = data.contact.Nome;
        this.contact.Data = data.contact.Data;
        this.contact.Descricao = data.contact.Descricao;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.contactService.editContact(this.contact, this.key);
      this.dialogRef.close();
    } else {
      this.contactService.addContact(this.contact);
      this.dialogRef.close();
    }
  }

}
