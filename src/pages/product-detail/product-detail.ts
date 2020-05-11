import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProdutoDTO;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get("produto_id");
    this.produtoService.findById(id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      }, error => { });
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.imageId)
      .subscribe(response => {
        this.item.imageUrl = API_CONFIG.bucketBaseUrl + '/prod' + this.item.imageId + '.jpg';
      }, error => {})
  }

  addToCart(produto : ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
