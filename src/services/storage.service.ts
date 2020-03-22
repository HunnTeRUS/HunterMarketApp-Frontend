import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storageKeys.config";
import { LocalUser } from "../models/localUser";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);

        if(usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(localUser : LocalUser){
        if(localUser == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
        }
    }
}