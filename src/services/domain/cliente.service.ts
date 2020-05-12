import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http : HttpClient,
         public storage : StorageService,
         public imageUtilService : ImageUtilService) {}

    findByEmail(email : string){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization':'Bearer ' + token});    

        return this.http.get(API_CONFIG.baseUrl + '/clientes/email?value=' + email, {'headers':authHeader});
    } 

    findById(id : string){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization':'Bearer ' + token});    

        return this.http.get(API_CONFIG.baseUrl + '/clientes/' + id, {'headers':authHeader});
    } 
    
    getImageFromBucket(id : string) : Observable<any> {
        let url = API_CONFIG.bucketBaseUrl + '/cp' + id + '.jpg';     
        return this.http.get(url, 
            {responseType: 'blob'}
            );
    } 

    insertCliente(cliente: ClienteDTO) {
        return this.http.post(API_CONFIG.baseUrl + '/clientes', cliente, {
            observe:'response',
            responseType:'text'
        });
    }

    uploadPicture(picture){
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(API_CONFIG.baseUrl + '/clientes/picture', formData, {
            observe:'response',
            responseType:'text'
        });
    }
}
