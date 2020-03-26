import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart.item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items : CartItem[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public produtoService : ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService .getCart();
    this.items = cart.items; 
    this.loadImageUrls();
  }

  loadImageUrls(){
    for(var i = 0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(response => {
        item.produto.imageUrl = API_CONFIG.bucketBaseUrl + '/prod' + item.produto.id + '-small.jpg';
      }, error => {})

    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseItem(produto: ProdutoDTO) {
    this.items = this.cartService.increaseProduto(produto).items;
  }

  decreaseItem(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseProduto(produto).items;
  }

  total() {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriesPage');
  }

}
