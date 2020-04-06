import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cart : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
          
          let cart = this.cart.getCart();
          
          this.pedido = {
            cliente : {id: response['id']},
            endereçoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id:x.produto.id}}})
          }; 
        }, error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }

  }

  nextPage(endereco : EnderecoDTO){
    this.pedido.endereçoDeEntrega = {id : endereco.id};
    this.navCtrl.push('PaymentsPage', {pedido: this.pedido});
  }


}
