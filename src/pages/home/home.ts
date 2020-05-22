import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { MyApp } from '../../app/app.component';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public auth: AuthService, 
    public loadingController: LoadingController, 
    public myapp: MyApp,
    public navigationBar: NavigationBar) {
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
      this.myapp.initializeCliente();
    },
      error => {
        loader.dismiss();
       })
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  forgotPassword(){
    this.navCtrl.push('ForgotPasswordPage');
  };

  presentLoading(){
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}