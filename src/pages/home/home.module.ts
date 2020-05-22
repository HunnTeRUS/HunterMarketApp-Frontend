import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)],
    providers:[
        NavigationBar
    ]
})
export class HomeModule {
}