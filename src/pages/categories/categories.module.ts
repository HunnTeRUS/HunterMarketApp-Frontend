import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import { ProductsPage } from '../products/products';

@NgModule({
  declarations: [
    CategoriesPage
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
  ]
})
export class CategoriesPageModule {}
