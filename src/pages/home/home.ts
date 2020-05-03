import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService, public loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(response => {
      this.auth.sucessfullLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriesPage');
    },
      error => { })  }

  login() {
    let loader = this.presentLoading();
    this.auth.authenticate(this.credenciais).subscribe(response => {
      this.auth.sucessfullLogin(response.headers.get("Authorization"));
      loader.dismiss();
      this.navCtrl.setRoot('CategoriesPage');
    },
      error => {
        loader.dismiss();
       })
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  presentLoading(){
    let loader = this.loadingController.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }
}