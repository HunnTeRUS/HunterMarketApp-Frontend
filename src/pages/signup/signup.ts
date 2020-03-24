import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder : FormBuilder  ) {
    this.formGroup = this.formBuilder.group({
      nome : ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)] ],
      email : ['Joaquim@gmail.com', [Validators.required, Validators.email] ],
      tipo : ['1', [Validators.required] ],
      cpfOuCnpj:  ['40269979018', [Validators.required, Validators.minLength(11), Validators.maxLength(14 )] ],
      senha:  ['joaquim123', [Validators.required ]],
      numero:  ['', [Validators.required ]],
      logradouro : ['Rua Via', [Validators.required] ],
      complemento:  ['', [Validators.required ]],
      bairro : ['Jardim Emilia', [] ],
      cep : ['10828333', [Validators.required] ],
      telefone1 : ['979684827', [Validators.required] ],
      telefone2 : ['', [] ],
      telefone3 : ['', [] ],
      estadoId : [null, [Validators.required] ],
      cidadeId : [null, [Validators.required] ], 
    });
  }

  signupUser(){
    console.log('Enviou o form');
  }

}
