import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailDTO } from '../../models/email.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

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
    public alertController : AlertController,
    public menu: MenuController, 
    public loadingController: LoadingController) {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]});
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(false);
  }

  submitPassword(){
    this.emaildto = this.formGroup.value; 

    let loader = this.presentLoading();
    this.service.forgotPassword(this.emaildto).subscribe(response=> {
      loader.dismiss();    
      let alert = this.alertController.create({
            title: 'Nova Senha',
            message : 'Será enviado em seu email a sua nova senha para acessar o app!',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        });
        alert.present();
    }, error => {
      loader.dismiss();    
    });
  }

  presentLoading(){
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
