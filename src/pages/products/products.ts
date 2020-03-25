import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriasId = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoriasId).subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    }, error => { });
  }

  loadImageUrls(){
    for(var i = 0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = API_CONFIG.bucketBaseUrl + '/prod' + item.id + '-small.jpg';
      }, error => {})

    }
  }

}
