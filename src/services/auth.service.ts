import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/localUser";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService{

    public jwtHelper: JwtHelper = new JwtHelper()

    constructor(public http : HttpClient, public storageService : StorageService) {

    }

    authenticate(credenciais : CredenciaisDTO) {
        return this.http.post( 
            API_CONFIG.baseUrl + "/login", 
            credenciais,
            {
                observe : 'response',
                responseType: 'text'
            } );
    }

    sucessfullLogin(authorizationValue : string ){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
             email : this.jwtHelper.decodeToken(tok).sub
        };

        this.storageService.setLocalUser(user);
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}