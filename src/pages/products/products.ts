import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProdutoDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
    console.log(this.items);
  }

  loadData(){
    let categoriasId = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriasId, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      loader.dismiss();
      this.loadImageUrls(start, end)    }
      , error => {
      loader.dismiss();
    });
  }

  loadImageUrls(start:number, end:number){
    for(var i = start; i<=end; i++) {
      let item = this.items[i];
      if(item.imageId)
      this.produtoService.getImageFromBucket(item.imageId)
      .subscribe(response => {
        item.imageUrl = API_CONFIG.bucketBaseUrl + '/prod' + item.imageId + '.jpg';
      }, error => {})
    }
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProductDetailPage', {produto_id : produto_id});
  }

  presentLoading(){
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {

      infiniteScroll.complete();
    }, 1000);
  }

  returnCategorias(){
    this.navCtrl.setRoot('CategoriesPage');
  }
}
