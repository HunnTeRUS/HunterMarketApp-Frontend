import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento:"Apto 200",
        bairro:"Santa Mônica",
        cep:"48293822",
        cidade:{
            id: "1",
            nome: "Uberlandia",
            estado: {
              id: "1",
              nome:"Minas Gerais"
            }
        }
      },
      {
        id: "2",
        logradouro: "Rua Dom Pedro II",
        numero: "1658",
        complemento:"",
        bairro:"Jardim Emilia",
        cep:"08566000",
        cidade:{
            id: "3",
            nome: "Poá",
            estado: {
              id: "2",
              nome:"São Paulo"
            }
        }
      }
    ];
  }

}
