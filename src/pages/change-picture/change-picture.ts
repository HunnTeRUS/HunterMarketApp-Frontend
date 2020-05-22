import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-change-picture',
  templateUrl: 'change-picture.html',
})
export class ChangePicturePage {

  cliente: ClienteDTO;
  picture : string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profile: ClienteService,
    public storage : StorageService,
    public camera: Camera,
    public myapp: MyApp) {
  }

  ionViewDidLoad() {
    this.initializeUser();
  }

  initializeUser(){
      let localUser = this.storage.getLocalUser();
      if(localUser){
      this.profile.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      },
      error => {});
    
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
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: 1,
        saveToPhotoAlbum: true
   }
   
    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture(){
    this.profile.uploadPicture(this.picture).subscribe(response => {
      this.picture = null;
      this.initializeUser();
      this.myapp.initializeCliente();
    }, error=>{})
  }

  cancel(){
    this.picture = null;
  }

}
