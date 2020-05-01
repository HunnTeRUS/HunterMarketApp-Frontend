import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ProfilePage } from '../pages/profile/profile';
import { ClienteService } from '../services/domain/cliente.service';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

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
    public storage : StorageService,
    public camera: Camera) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categories', component: 'CategoriesPage' },
      { title: 'My Cart', component: 'CartPage' },
      { title: 'Change Picture', component: '' },
      { title: 'Logout', component: '' }
    ];

    this.initializeApp();
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


  getCameraPicture(){
    this.cameraOn = true;
   const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.PNG,
     mediaType: this.camera.MediaType.PICTURE
   }
   
   this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false;
   }, (err) => {
    // Handle error
   });
  }

  sendPicture(){
    this.profile.uploadPicture(this.picture).subscribe(response => {
      this.picture = null;
      this.initializeApp();
    }, error=>{})
  }

  cancel(){
    this.picture = null;
  }
}
