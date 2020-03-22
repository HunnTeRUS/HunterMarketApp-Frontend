import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items : CategoriaDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public categoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {})
  }

}
