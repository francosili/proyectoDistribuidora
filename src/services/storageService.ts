import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
    constructor(private storage: Storage) { }

    getStorage(key) {
        return this.storage.get(key);
    }

    setStorage(key, value) {
        return this.storage.set(key, value);
    }

    removeStorage(key) {
        return this.storage.remove(key);
    }
}