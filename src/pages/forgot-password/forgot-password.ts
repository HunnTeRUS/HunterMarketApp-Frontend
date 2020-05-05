import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, setupProvideEvents, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailDTO } from '../../models/email.dto';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  formGroup: FormGroup;
  emaildto : EmailDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder, 
    public service : AuthService,
    public alertController : AlertController) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]});
  }

  ionViewDidLoad() {
  }

  submitPassword(){
    this.emaildto = this.formGroup.value; 
    console.log(this.emaildto);


    this.service.forgotPassword(this.emaildto).subscribe(response=> {
          let alert = this.alertController.create({
            title: 'Nova Senha',
            message : 'Se essa é uma conta valida, será enviada a nova senha em seu email!',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        });
        alert.present();
    }, error => {});
  }

}
