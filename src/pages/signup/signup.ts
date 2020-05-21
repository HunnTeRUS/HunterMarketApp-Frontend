import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, AlertController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  isTextFieldType: boolean;
  myColor: string = 'dark';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertController: AlertController,
    public menu: MenuController) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
    }
  ionViewDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(false);
    }

  signupUser() {
    this.clienteService.insertCliente(this.formGroup.value).subscribe(response => {
      this.showInsertOK();
    }, error => { });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => {

    })
  }

  toggleColor() {
    this.myColor = 'danger';
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => { })
  }

  showInsertOK() {
    let alert = this.alertController.create({
      title: 'Conta criada com sucesso',
      message: 'Cadastro realizado',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
