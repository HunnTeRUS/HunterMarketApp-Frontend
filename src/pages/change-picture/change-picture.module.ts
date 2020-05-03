import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePicturePage } from './change-picture';

@NgModule({
  declarations: [
    ChangePicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePicturePage),
  ],
})
export class ChangePicturePageModule {}
