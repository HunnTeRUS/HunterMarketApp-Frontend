import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePicturePage } from './change-picture';
import { Camera } from '@ionic-native/camera';
import { MyApp } from '../../app/app.component';

@NgModule({
  declarations: [
    ChangePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePicturePage),
  ],
  providers:[
    Camera,
    MyApp
  ]
})
export class ChangePicturePageModule {}
