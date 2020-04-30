import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,
    public http: HttpClient)
    {
    this.pedido = this.navParams.get('pedido');
    }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
    }, error => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  private findEndereco(id: string, listEndereco: EnderecoDTO[]): EnderecoDTO {
    let position = listEndereco.findIndex(x => x.id == id);
    return listEndereco[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
    .subscribe((res: HttpResponse<any>)=> {
        this.cartService.createOfClearCart();
        console.log(res.headers.get('location'));
        console.log(res.headers.get('Location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }
}