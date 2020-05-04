import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  cliente: ClienteDTO;
  picture : string;
  cameraOn: boolean = false;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public authService : AuthService, 
    public profile: ClienteService,
    public storage : StorageService) {
    this.initializeApp();

    this.initializeCliente();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categories', component: 'CategoriesPage' },
      { title: 'My Cart', component: 'CartPage' },
      { title: 'Change Picture', component: 'ChangePicturePage' },
      { title: 'Logout', component: '' }
    ];

  }  

  initializeCliente(){
    let localUser = this.storage.getLocalUser();
    if(localUser){
    this.profile.findByEmail(localUser.email).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.getImageIfExists();
    },
    error => {});
  }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: string, component: string}) {

    switch(page.title){
      case 'Logout':
        this.authService.logout();
        this.nav.setRoot('HomePage');
        break;
       
      default:  
        this.nav.setRoot(page.component);

    }
  }

  getImageIfExists(){
    this.profile.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = API_CONFIG.bucketBaseUrl + "/cp" + this.cliente.id + ".jpg";
    },
    error => {});
  }
}
