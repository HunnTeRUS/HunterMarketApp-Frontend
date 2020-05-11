import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProductsPage } from '../products/products';

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

  showProdutos(categoria_id : string){//Nome do Parametro: Valor dele = Esta passando um valor como parametro para quando a pagina for carregada em push
    this.navCtrl.push('ProductsPage', {categoria_id: categoria_id});
  }

}
