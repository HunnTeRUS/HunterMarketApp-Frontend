import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['Joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['40269979018', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['joaquim123', [Validators.required]],
      numero: ['', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      complemento: ['', [Validators.required]],
      bairro: ['Jardim Emilia', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['979684827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    });
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

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => { })
  }

  showInsertOK() {
    let alert = this.alertController.create({
      title: 'Accout created sucessfully',
      message: 'Cadaster created',
      enableBackdropDismiss: false,
      buttons: [{ 
        text: 'Ok',
        handler: () => { 
          this.navCtrl.pop();
         } }]
    });
    alert.present();
  }

}
